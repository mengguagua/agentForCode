import 'dotenv/config';
import nodeFetch from 'node-fetch';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const BASE_URL = process.env.MINIMAX_BASE_URL || 'https://api.minimaxi.com/v1';

async function testEndpoint(endpoint, method = 'POST', body = null) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`\n测试: ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MINIMAX_API_KEY}`
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await nodeFetch(url, options);
    const text = await response.text();
    console.log(`状态: ${response.status}`);
    console.log(`响应: ${text.substring(0, 500)}`);
    return response.status;
  } catch (error) {
    console.log(`错误: ${error.message}`);
    return null;
  }
}

async function main() {
  const testPrompt = "A cute cat";
  
  console.log('=== MiniMax API 端点测试 ===');
  
  // 测试不同的图像生成端点
  await testEndpoint('/images/generations', 'POST', {
    model: 'image-01',
    prompt: testPrompt,
    response_format: 'url'
  });
  
  await testEndpoint('/image_generation', 'POST', {
    model: 'image-01',
    prompt: testPrompt,
    response_format: 'url'
  });
  
  await testEndpoint('/v1/images/generations', 'POST', {
    model: 'image-01',
    prompt: testPrompt,
    response_format: 'url'
  });
  
  // 测试chat completions端点（确保API Key有效）
  await testEndpoint('/chat/completions', 'POST', {
    model: 'abab6.5s-chat',
    messages: [{ role: 'user', content: 'Hello' }]
  });
  
  console.log('\n=== 测试完成 ===');
}

main().catch(console.error);
