import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取Excel文件
function readExcel(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        return {
            totalRows: data.length,
            columns: data[0],
            data: data.slice(1) // 排除表头
        };
    } catch (error) {
        throw error;
    }
}

// 主要比较逻辑
async function compareExcelFiles() {
    console.log('开始对比Excel文件...\n');
    
    // 读取两个Excel文件
    const officialFile = path.join(__dirname, '流向数据归属26年3月.xlsx'); // 当月的销量统计excel
    const actualFile = path.join(__dirname, '华东医药1-3月流向.xlsx'); // 销售代表提供的实际销量excel
    
    console.log('读取官方统计文件:', path.basename(officialFile));
    const officialData = readExcel(officialFile);
    console.log(`官方统计文件总行数: ${officialData.totalRows}`);
    console.log(`列名: ${officialData.columns}\n`);
    
    console.log('读取销售代表实际销量文件:', path.basename(actualFile));
    const actualData = readExcel(actualFile);
    console.log(`销售代表文件总行数: ${actualData.totalRows}`);
    console.log(`列名: ${actualData.columns}\n`);
    
    // 找出actualData中独有的记录
    // 筛选条件：销售类型='销售'，上游企业名称='浙江佐力药业股份有限公司'，月份='2026-03'
    const uniqueRecords = [];
    const duplicateRecords = [];
    
    // 创建官方数据的键值集合（用于快速查找）
    const officialKeys = new Set();
    officialData.data.forEach(row => {
        // 创建唯一键：客户名称 + 商品名称 + 批号 + 供应数量
        const key = `${row[11] || ''}_${row[6] || ''}_${row[8] || ''}_${row[2] || ''}`;
        officialKeys.add(key);
    });
    
    console.log('开始对比数据...\n');
    
    // 遍历销售代表的数据
    actualData.data.forEach((row, index) => {
        const salesType = row[0]; // 单据类型
        const upstreamCompany = row[9]; // 上市许可持有人
        const invoiceDate = row[1]; // 开票时间
        const customerName = row[11]; // 客户名称
        const productName = row[6]; // 商品名称
        const batchNumber = row[8]; // 批号
        const supplyQty = row[2]; // 供应数量
        
        // 筛选条件：销售类型='销售'，上游企业名称='浙江佐力药业股份有限公司'，月份='2026-03'
        const isTargetRecord = salesType === '销售' && 
                               upstreamCompany === '浙江佐力药业股份有限公司' &&
                               invoiceDate && invoiceDate.toString().includes('2026-03');
        
        if (!isTargetRecord) {
            return; // 跳过不满足条件的记录
        }
        
        // 创建唯一键
        const key = `${customerName}_${productName}_${batchNumber}_${supplyQty}`;
        
        if (officialKeys.has(key)) {
            duplicateRecords.push({ row, index: index + 2 }); // +2 因为表头占1行，索引从0开始
        } else {
            uniqueRecords.push({ row, index: index + 2 }); // +2 因为表头占1行，索引从0开始
        }
    });
    
    console.log('========== 对比结果 ==========');
    console.log(`销售代表文件中符合条件的记录数: ${actualData.data.filter(row => {
        const salesType = row[0];
        const upstreamCompany = row[9];
        const invoiceDate = row[1];
        return salesType === '销售' && 
               upstreamCompany === '浙江佐力药业股份有限公司' &&
               invoiceDate && invoiceDate.toString().includes('2026-03');
    }).length}`);
    console.log(`官方统计中存在的记录数: ${duplicateRecords.length}`);
    console.log(`销售代表多出的记录数: ${uniqueRecords.length}`);
    console.log('================================\n');
    
    // 如果有多的记录，创建新的Excel文件
    if (uniqueRecords.length > 0) {
        console.log('正在创建差异Excel文件...\n');
        
        // 准备数据
        const headers = actualData.columns;
        const rows = uniqueRecords.map(item => item.row);
        
        // 创建工作表
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        
        // 创建工作簿
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '差异数据');
        
        // 保存文件
        const outputPath = path.join(__dirname, '差异数据_2026年3月.xlsx');
        XLSX.writeFile(wb, outputPath);
        
        console.log(`✅ 差异数据已保存到: ${outputPath}`);
        console.log(`共 ${uniqueRecords.length} 条记录\n`);
        
        // 显示前5条差异数据预览
        console.log('前5条差异数据预览:');
        uniqueRecords.slice(0, 5).forEach((item, idx) => {
            console.log(`\n差异${idx + 1} (原始行号: ${item.index}):`);
            console.log(`  客户: ${item.row[11]}`);
            console.log(`  商品: ${item.row[6]}`);
            console.log(`  规格: ${item.row[7]}`);
            console.log(`  批号: ${item.row[8]}`);
            console.log(`  供应数量: ${item.row[2]}`);
            console.log(`  总金额: ${item.row[5]}`);
        });
    } else {
        console.log('✅ 没有发现销售代表多出的记录');
    }
    
    console.log('\n========== 对比完成 ==========');
}

// 执行对比
compareExcelFiles().catch(error => {
    console.error('执行过程中出错:', error);
    process.exit(1);
});
