package com.weichu.mdesigner.utils.poi;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * excel导入导出
 * 
 * @author Administrator
 *
 */
@Component
public class PoiExcelHelper {

	private Logger logger = LoggerFactory.getLogger(PoiExcelHelper.class);

	public List<List<Object>> readExcel(InputStream is) throws IOException {
		List<List<Object>> results = new ArrayList<>();
		Workbook xssfWorkbook = new XSSFWorkbook(is);
		try {
			Sheet sheet = xssfWorkbook.getSheetAt(0); // 获取文件的第一个sheet
			for (Row row : sheet) {
				if (row.getRowNum() == 0) {
					continue;
				}
				List<Object> rows = new ArrayList<>();
				for (Cell cell : row) {
					CellType cellType = cell.getCellTypeEnum();
					switch (cellType) {
					case STRING:
						rows.add(cell.getStringCellValue());
						break;
					case NUMERIC:
						rows.add(cell.getNumericCellValue());
						break;
					default:
						break;
					}
				}
				results.add(rows);
			}
		} finally {
			logger.info("读取excel完毕!");
			is.close();
			xssfWorkbook.close();
		}		
		return results;
	}

	public void writeExcel(String sheetName, String[] titles, String[][] values, OutputStream os) throws IOException {
		// 第一步，创建一个HSSFWorkbook，对应一个Excel文件
		Workbook wb = new XSSFWorkbook();
		try {
			// 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
			Sheet sheet = wb.createSheet(sheetName);	
			sheet.autoSizeColumn(0);//列宽度自适应
			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
			Row row = sheet.createRow(0);
			// 第四步，创建单元格，并设置值表头 设置表头居中
			CellStyle style = wb.createCellStyle();
			style.setAlignment(HorizontalAlignment.CENTER); // 创建一个居中格式
			Font font = wb.createFont();
			font.setBold(true);
			style.setFont(font);
			Cell cell = null;
			// 创建标题
			for (int i = 0; i < titles.length; i++) {
				cell = row.createCell(i);
				cell.setCellValue(titles[i]);
				cell.setCellStyle(style);
				sheet.setColumnWidth(i, titles[i].toString().length() * 600);
			}
			// 创建内容
			for (int i = 0; i < values.length; i++) {
				row = sheet.createRow(i + 1);
				for (int j = 0; j < values[i].length; j++) {
					// 将内容按顺序赋给对应的列对象
					row.createCell(j).setCellValue(values[i][j]);
				}
			}
			wb.write(os);
		} finally {
			logger.info("写入excel完毕!");
			wb.close();
		}
	}
	
	public void writeExcel(String sheetName, String[] titles, String[][] values, OutputStream os, String footer) throws IOException {
		// 第一步，创建一个HSSFWorkbook，对应一个Excel文件
		Workbook wb = new XSSFWorkbook();
		try {
			// 第二步，在workbook中添加一个sheet,对应Excel文件中的sheet
			Sheet sheet = wb.createSheet(sheetName);
			sheet.autoSizeColumn(0);//列宽度自适应
			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
			Row row = sheet.createRow(0);
			// 第四步，创建单元格，并设置值表头 设置表头居中
			CellStyle style = wb.createCellStyle();
			style.setAlignment(HorizontalAlignment.CENTER); // 创建一个居中格式
			Font font = wb.createFont();
			font.setBold(true);
			style.setFont(font);
			Cell cell = null;
			// 创建标题
			for (int i = 0; i < titles.length; i++) {
				cell = row.createCell(i);
				cell.setCellValue(titles[i]);
				cell.setCellStyle(style);
				sheet.setColumnWidth(i, titles[i].toString().length() * 800);
			}
			sheet.setColumnWidth(0, 10 * 300);
			// 创建内容
			for (int i = 0; i < values.length; i++) {
				row = sheet.createRow(i + 1);
				for (int j = 0; j < values[i].length; j++) {
					// 将内容按顺序赋给对应的列对象
					style = wb.createCellStyle();
					style.setAlignment(HorizontalAlignment.RIGHT);
					cell = row.createCell(j);
					cell.setCellStyle(style);
					cell.setCellValue(values[i][j]);
				}
			}
			//footer
			CellRangeAddress cellRangeAddress =new CellRangeAddress(values.length + 1, values.length + 1, 0, titles.length - 1);
			sheet.addMergedRegion(cellRangeAddress);
			row = sheet.createRow(values.length + 1);
			cell = row.createCell(0);
			//靠右对齐
			style = wb.createCellStyle();
			style.setAlignment(HorizontalAlignment.RIGHT);
			cell.setCellValue(footer);
			cell.setCellStyle(style);
			wb.write(os);
		} finally {
			logger.info("写入excel完毕!");
			wb.close();
		}
	}

	public static void main(String[] args) {
		File file = new File("D://test.xlsx");
		PoiExcelHelper helper = new PoiExcelHelper();
		try {
			List<List<Object>> results = helper.readExcel(new FileInputStream(file));
			System.out.print(results.size());
		} catch (IOException e) {
			e.printStackTrace();
		}
		String[] titles = new String[] { "title1", "title2", "title3" };
		String[] row = new String[] { "row1-c1", "row1-c2", "row1-c3" };
		String[] row2 = new String[] { "row2-c1", "row2-c2", "row2-c3" };
		String[][] values = new String[][] { row, row2 };
		try {
			OutputStream os = new FileOutputStream(new File("D://test2.xlsx"));
			helper.writeExcel("aaa", titles, values, os);
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
