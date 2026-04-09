import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查是否安装了xlsx模块
async function checkXlsxModule() {
    try {
        await import('xlsx');
        return true;
    } catch (e) {
        return false;
    }
}

// 安装xlsx模块
function installXlsx() {
    try {
        console.log('正在安装xlsx模块...');
        execSync('npm install xlsx', { stdio: 'inherit' });
        console.log('xlsx模块安装成功');
    } catch (error) {
        console.error('安装失败:', error);
        throw error;
    }
}

// 读取Excel文件
async function readExcel(filePath) {
    try {
        const XLSX = await import('xlsx');
        const workbook = XLSX.default.readFile(filePath);
        
        // 获取第一个工作表
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // 转换为JSON
        const data = XLSX.default.utils.sheet_to_json(worksheet, { header: 1 });
        
        return {
            rowCount: data.length - 1, // 减去表头行
            totalRows: data.length,
            columns: data[0],
            preview: data.slice(1, 6), // 前5行数据
            allData: data
        };
    } catch (error) {
        throw error;
    }
}

// 主函数
async function main() {
    const filePath = path.join(__dirname, '华东医药1-3月流向.xlsx');
    
    console.log('开始读取Excel文件...');
    console.log('文件路径:', filePath);
    
    try {
        // 检查xlsx模块
        if (!checkXlsxModule()) {
            await installXlsx();
        }
        
        // 读取Excel
        const result = await readExcel(filePath);
        
        console.log('\n========== Excel文件分析结果 ==========');
        console.log('文件:', path.basename(filePath));
        console.log('总行数（含表头）:', result.totalRows);
        console.log('数据行数（不含表头）:', result.rowCount);
        console.log('\n列名:', result.columns);
        console.log('\n前5行数据预览:');
        result.preview.forEach((row, index) => {
            console.log(`行${index + 1}:`, row);
        });
        console.log('========================================\n');
        
    } catch (error) {
        console.error('读取Excel文件时出错:', error.message);
        process.exit(1);
    }
}

main();
