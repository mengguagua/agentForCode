import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import { input } from "@inquirer/prompts";
import { systemPrompt } from "./prompt.js";

dotenv.config();

const ENABLE_MD_SAVE = true;

const client = new OpenAI({
  apiKey: process.env.MINIMAX_API_KEY,
  baseURL: process.env.MINIMAX_BASE_URL,
});

const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
  { role: "system", content: systemPrompt }
];

// 标准工具调用类型定义
interface StandardToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "read_local_file",
      description: "读取本地计算机上的代码文件内容",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string", description: "文件的相对或绝对路径" },
        },
        required: ["filePath"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "write_local_file",
      description: "修改或创建本地文件。要求必须提供整个文件的完整代码。",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string", description: "要写入的文件路径" },
          content: { type: "string", description: "要写入的完整文件内容" },
        },
        required: ["filePath", "content"],
      },
    },
  }
];

async function chatLoop() {
  console.log("🤖 全栈 Agent 已启动！(输入 'exit' 退出)\n");

  while (true) {
    const userMessage = await input({ message: "你有什么开发问题？" });
    if (userMessage.toLowerCase() === "exit") {
      console.log("拜拜！祝你编码愉快。");
      break;
    }
    if (!userMessage.trim()) continue;

    messages.push({ role: "user", content: userMessage });

    try {
      let isAgentThinking = true;

      // 🔄 核心：开启 Agent 的思考与行动循环
      while (isAgentThinking) {
        process.stdout.write("Agent 思考/执行中...\r");

        const response = await client.chat.completions.create({
          model: "MiniMax-M2.7",
          messages: messages,
          temperature: 0.7,
          tools: tools,
          tool_choice: "auto",
        });

        const responseMessage = response.choices[0]?.message;
        if (!responseMessage) break;

        // 如果模型调用了工具
        if (responseMessage.tool_calls) {
          console.log("\x1b[33m%s\x1b[0m", "\n⚙️  Agent 决定采取行动...");
          messages.push(responseMessage); // 记录历史

          // 将 tool_calls 断言为标准类型，OpenAI SDK v6 的类型定义有偏差
          const toolCalls = responseMessage.tool_calls as unknown as StandardToolCall[];

          for (const toolCall of toolCalls) {
            let toolResultMsg = "";
            let args;

            try {
              args = JSON.parse(toolCall.function.arguments);
            } catch (e) {
              toolResultMsg = "JSON参数解析失败，请检查格式。";
              console.log(`❌ ${toolResultMsg}`);
              continue;
            }

            const absolutePath = path.resolve(process.cwd(), args.filePath);

            if (toolCall.function.name === "read_local_file") {
              console.log(`📄 动作：读取文件 -> ${args.filePath}`);
              try {
                toolResultMsg = fs.readFileSync(absolutePath, "utf-8");
                console.log(`✅ 读取完毕`);
              } catch (err: any) {
                toolResultMsg = `读取失败: ${err.message}`;
                console.log(`❌ ${toolResultMsg}`);
              }
            } else if (toolCall.function.name === "write_local_file") {
              console.log(`✏️ 动作：修改/写入文件 -> ${args.filePath}`);
              try {
                fs.writeFileSync(absolutePath, args.content, "utf-8");
                toolResultMsg = "写入成功！文件已更新。";
                console.log(`✅ 写入完毕`);
              } catch (err: any) {
                toolResultMsg = `写入失败: ${err.message}`;
                console.log(`❌ ${toolResultMsg}`);
              }
            }

            // 将工具执行结果喂给模型，触发下一轮 while 循环
            messages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: toolResultMsg,
            });
          }
        } else {
          // 如果没有工具调用，说明任务全部完成，输出最终结论！
          isAgentThinking = false;
          const content = responseMessage.content || "";

          console.log("\x1b[36m%s\x1b[0m", "\n🤖 Agent 回复:");
          console.log(content);
          console.log("\n" + "-".repeat(50) + "\n");
          messages.push({ role: "assistant", content: content });

          if (ENABLE_MD_SAVE && content) {
            const fileName = `agent_output_${Date.now()}.md`;
            fs.writeFileSync(fileName, content, "utf-8");
            console.log(`\x1b[32m%s\x1b[0m`, `📝 [自动保存] Review或回答已保存: ${fileName}\n`);
          }
        }
      } // end while (isAgentThinking)

    } catch (error: any) {
      console.error("\n❌ API 调用失败:", error.message);
    }
  }
}

chatLoop();
