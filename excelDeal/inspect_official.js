import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取Excel文件并转换为对象数组
function readExcelAsObjects(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        return {
            totalRows: data.length + 1,
            columns: Object.keys(data[0] || {}),
            data: data
        };
    } catch (error) {
        throw error;
    }
}

// 主函数
async function main() {
    const officialFile = path.join(__dirname, '流向数据归属26年3月.xlsx');
    
    console.log('读取官方统计文件:', path.basename(officialFile));
    const officialData = readExcelAsObjects(officialFile);
    
    console.log(`\n总行数: ${officialData.totalRows}`);
    console.log(`\n列名:\n${officialData.columns.join('\n')}`);
    
    console.log('\n\n========== 前10行数据样例 ==========');
    officialData.data.slice(0, 10).forEach((row, idx) => {
        console.log(`\n第${idx + 1}行:`);
        console.log(`  销售日期: ${row['销售日期']}`);
        console.log(`  上游企业名称: ${row['上游企业名称']}`);
        console.log(`  下游企业名称: ${row['下游企业名称']}`);
        console.log(`  产品名称: ${row['产品名称']}`);
        console.log(`  产品批号: ${row['产品批号']}`);
        console.log(`  销售数量: ${row['销售数量']}`);
        console.log(`  销售价格: ${row['销售价格']}`);
    });
    
    // 统计上游企业名称的唯一值
    console.log('\n\n========== 上游企业名称统计 ==========');
    const upstreamCompanies = new Set();
    officialData.data.forEach(row => {
        upstreamCompanies.add(row['上游企业名称']);
    });
    console.log(`唯一上游企业数量: ${upstreamCompanies.size}`);
    console.log('上游企业列表:');
    upstreamCompanies.forEach(company => {
        console.log(`  - ${company}`);
    });
    
    // 统计销售日期的唯一值
    console.log('\n\n========== 销售日期统计 ==========');
    const salesDates = new Set();
    officialData.data.forEach(row => {
        const date = row['销售日期'];
        if (date) {
            salesDates.add(date.toString().substring(0, 10)); // 取前10个字符（YYYY-MM-DD）
        }
    });
    console.log(`唯一日期数量: ${salesDates.size}`);
    console.log('日期范围:');
    salesDates.forEach(date => {
        console.log(`  - ${date}`);
    });
}

main().catch(error => {
    console.error('执行过程中出错:', error);
    process.exit(1);
});
