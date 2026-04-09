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
            totalRows: data.length + 1, // +1 for header
            columns: Object.keys(data[0] || {}),
            data: data
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
    const officialData = readExcelAsObjects(officialFile);
    console.log(`官方统计文件总行数: ${officialData.totalRows}`);
    console.log(`列名: ${officialData.columns.join(', ')}\n`);
    
    console.log('读取销售代表实际销量文件:', path.basename(actualFile));
    const actualData = readExcelAsObjects(actualFile);
    console.log(`销售代表文件总行数: ${actualData.totalRows}`);
    console.log(`列名: ${actualData.columns.join(', ')}\n`);
    
    // 找出actualData中独有的记录
    const uniqueRecords = [];
    const duplicateRecords = [];
    
    // 官方数据的列名映射
    // 官方文件：销售日期,上游企业名称,下游企业名称,产品名称,产品批号,销售数量
    const officialKeyFields = {
        downstreamCompany: '下游企业名称',
        productName: '产品名称',
        batchNumber: '产品批号',
        salesQuantity: '销售数量',
        upstreamCompany: '上游企业名称'
    };
    
    // 销售代表文件的列名映射
    // 销售代表文件：开票时间,上市许可持有人,客户名称,商品名称,批号,供应数量
    const actualKeyFields = {
        invoiceDate: '开票时间',
        upstreamCompany: '上市许可持有人',
        customerName: '客户名称',
        productName: '商品名称',
        batchNumber: '批号',
        supplyQuantity: '供应数量'
    };
    
    console.log('开始创建官方数据的索引...\n');
    
    // 创建官方数据的键值集合
    const officialKeys = new Set();
    officialData.data.forEach((row, idx) => {
        // 筛选条件：上游企业='浙江佐力药业股份有限公司'，日期包含'2026-03'
        const upstreamCompany = row[officialKeyFields.upstreamCompany];
        const salesDate = row['销售日期'];
        
        if (upstreamCompany !== '浙江佐力药业股份有限公司') {
            return;
        }
        if (!salesDate || !salesDate.toString().includes('2026-03')) {
            return;
        }
        
        // 创建唯一键：下游企业名称 + 产品名称 + 产品批号 + 销售数量
        const key = `${row[officialKeyFields.downstreamCompany] || ''}_${row[officialKeyFields.productName] || ''}_${row[officialKeyFields.batchNumber] || ''}_${row[officialKeyFields.salesQuantity] || ''}`;
        officialKeys.add(key);
    });
    
    console.log(`官方统计中符合条件的记录数: ${officialKeys.size}`);
    console.log('开始对比数据...\n');
    
    // 遍历销售代表的数据
    actualData.data.forEach((row, index) => {
        // 筛选条件：上市许可持有人='浙江佐力药业股份有限公司'，开票时间包含'2026-03'
        const upstreamCompany = row[actualKeyFields.upstreamCompany];
        const invoiceDate = row[actualKeyFields.invoiceDate];
        const customerName = row[actualKeyFields.customerName];
        const productName = row[actualKeyFields.productName];
        const batchNumber = row[actualKeyFields.batchNumber];
        const supplyQuantity = row[actualKeyFields.supplyQuantity];
        
        if (upstreamCompany !== '浙江佐力药业股份有限公司') {
            return;
        }
        if (!invoiceDate || !invoiceDate.toString().includes('2026-03')) {
            return;
        }
        
        // 创建唯一键
        const key = `${customerName}_${productName}_${batchNumber}_${supplyQuantity}`;
        
        if (officialKeys.has(key)) {
            duplicateRecords.push({ row, index: index + 2 });
        } else {
            uniqueRecords.push({ row, index: index + 2 });
        }
    });
    
    console.log('========== 对比结果 ==========');
    console.log(`官方统计中符合条件的记录数: ${officialKeys.size}`);
    console.log(`销售代表文件中符合条件的记录数: ${duplicateRecords.length + uniqueRecords.length}`);
    console.log(`官方统计中存在的记录数: ${duplicateRecords.length}`);
    console.log(`销售代表多出的记录数: ${uniqueRecords.length}`);
    console.log('================================\n');
    
    // 如果有多的记录，创建新的Excel文件
    if (uniqueRecords.length > 0) {
        console.log('正在创建差异Excel文件...\n');
        
        // 准备数据（保留原始格式）
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
        const outputPath = path.join(__dirname, '差异数据_2026年3月_v2.xlsx');
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
        console.log('✅ 没有发现销售代表多出的记录');
    }
    
    console.log('\n========== 对比完成 ==========');
}

// 执行对比
compareExcelFiles().catch(error => {
    console.error('执行过程中出错:', error);
    process.exit(1);
});
