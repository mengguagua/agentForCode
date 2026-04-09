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
    console.log('开始对比Excel文件...\n');
    
    // 读取两个Excel文件
    const officialFile = path.join(__dirname, '流向数据归属26年3月.xlsx'); // 当月的销量统计excel
    const actualFile = path.join(__dirname, '华东医药1-3月流向.xlsx'); // 销售代表提供的实际销量excel
    
    console.log('读取官方统计文件:', path.basename(officialFile));
    const officialData = readExcelAsObjects(officialFile);
    console.log(`官方统计文件总行数: ${officialData.totalRows}\n`);
    
    console.log('读取销售代表实际销量文件:', path.basename(actualFile));
    const actualData = readExcelAsObjects(actualFile);
    console.log(`销售代表文件总行数: ${actualData.totalRows}\n`);
    
    // 检查华东医药相关企业
    console.log('========== 检查华东医药相关企业 ==========');
    const huadongCompanies = officialData.data.filter(row => 
        row['上游企业名称'] && row['上游企业名称'].includes('华东医药')
    );
    
    if (huadongCompanies.length > 0) {
        console.log(`找到 ${huadongCompanies.length} 条华东医药相关记录`);
        console.log('企业名称:');
        const uniqueCompanies = new Set(huadongCompanies.map(row => row['上游企业名称']));
        uniqueCompanies.forEach(company => console.log(`  - ${company}`));
        
        console.log('\n前3条华东医药记录:');
        huadongCompanies.slice(0, 3).forEach((row, idx) => {
            console.log(`\n记录${idx + 1}:`);
            console.log(`  销售日期: ${row['销售日期']}`);
            console.log(`  上游企业名称: ${row['上游企业名称']}`);
            console.log(`  下游企业名称: ${row['下游企业名称']}`);
            console.log(`  产品名称: ${row['产品名称']}`);
            console.log(`  产品批号: ${row['产品批号']}`);
            console.log(`  销售数量: ${row['销售数量']}`);
        });
    } else {
        console.log('❌ 未找到华东医药相关记录');
    }
    
    // 使用更宽松的对比条件
    console.log('\n\n========== 使用产品名称和日期进行对比 ==========');
    
    const uniqueRecords = [];
    const duplicateRecords = [];
    
    // 创建官方数据的键值集合（使用多个条件）
    const officialKeys = new Set();
    officialData.data.forEach((row, idx) => {
        // 筛选条件：产品名称包含"乌灵胶囊"，日期包含"2026/03"
        const productName = row['产品名称'];
        const salesDate = row['销售日期'];
        
        if (!productName || !productName.includes('乌灵胶囊')) {
            return;
        }
        if (!salesDate || !salesDate.toString().includes('2026/03')) {
            return;
        }
        
        // 创建唯一键：下游企业名称 + 产品名称 + 产品批号 + 销售数量
        const key = `${row['下游企业名称'] || ''}_${productName}_${row['产品批号'] || ''}_${row['销售数量'] || ''}`;
        officialKeys.add(key);
    });
    
    console.log(`官方统计中乌灵胶囊（2026/03）的记录数: ${officialKeys.size}`);
    
    // 遍历销售代表的数据
    actualData.data.forEach((row, index) => {
        // 筛选条件：商品名称包含"乌灵胶囊"，开票时间包含"2026-03"
        const productName = row['商品名称'];
        const invoiceDate = row['开票时间'];
        
        if (!productName || !productName.includes('乌灵胶囊')) {
            return;
        }
        if (!invoiceDate || !invoiceDate.toString().includes('2026-03')) {
            return;
        }
        
        // 创建唯一键
        const key = `${row['客户名称'] || ''}_${productName}_${row['批号'] || ''}_${row['供应数量'] || ''}`;
        
        if (officialKeys.has(key)) {
            duplicateRecords.push({ row, index: index + 2 });
        } else {
            uniqueRecords.push({ row, index: index + 2 });
        }
    });
    
    console.log(`\n销售代表文件中乌灵胶囊（2026-03）的记录数: ${duplicateRecords.length + uniqueRecords.length}`);
    console.log(`官方统计中存在的记录数: ${duplicateRecords.length}`);
    console.log(`销售代表多出的记录数: ${uniqueRecords.length}`);
    
    // 如果有多的记录，创建新的Excel文件
    if (uniqueRecords.length > 0) {
        console.log('\n正在创建差异Excel文件...\n');
        
        // 准备数据
        const headers = actualData.columns;
        const rows = uniqueRecords.map(item => {
            const newRow = [];
            headers.forEach(col => {
                newRow.push(item.row[col] || '');
            });
            return newRow;
        });
        
        // 创建工作表
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        
        // 创建工作簿
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '差异数据');
        
        // 保存文件
        const outputPath = path.join(__dirname, '差异数据_华东医药_2026年3月_乌灵胶囊.xlsx');
        XLSX.writeFile(wb, outputPath);
        
        console.log(`✅ 差异数据已保存到: ${outputPath}`);
        console.log(`共 ${uniqueRecords.length} 条记录\n`);
        
        // 显示前10条差异数据预览
        console.log('前10条差异数据预览:');
        uniqueRecords.slice(0, 10).forEach((item, idx) => {
            console.log(`\n差异${idx + 1} (原始行号: ${item.index}):`);
            console.log(`  客户: ${item.row['客户名称']}`);
            console.log(`  商品: ${item.row['商品名称']}`);
            console.log(`  规格: ${item.row['规格']}`);
            console.log(`  批号: ${item.row['批号']}`);
            console.log(`  供应数量: ${item.row['供应数量']}`);
            console.log(`  总金额: ${item.row['总金额']}`);
        });
    } else {
        console.log('\n✅ 没有发现销售代表多出的记录');
    }
    
    console.log('\n========== 对比完成 ==========');
}

main().catch(error => {
    console.error('执行过程中出错:', error);
    process.exit(1);
});
