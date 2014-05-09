/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class GraphData {

//    private List<List> dateTimeDataList = new ArrayList<>();
    private List<String> data = new ArrayList<>();
    private List<String> dateTime = new ArrayList<>();

//    public void setDateTimeDataList(List<List> dateTimeDataList) {
//        this.dateTimeDataList = dateTimeDataList;
//    }

    public void setData(List<String> data) {
        this.data = data;
    }

    public void setDateTime(List<String> dateTime) {
        this.dateTime = dateTime;
    }

    @Override
    public String toString() {
        String dataStr = "";
        for (int i = 0; i < data.size(); i++) {
            String dataRow = "";
            dataRow += "," + data.get(i);
            dataStr += dataRow.substring(1) + "\\" + "n";
        }
        return dataStr;
    }

    public GraphData getGraphData() {
        return this;
    }

    public List<String> getDateTime() {
        return dateTime;
    }

    public List<String> getData() {
        return data;
    }

    public String getValueForDateTime(String hr) {
        int ix = dateTime.indexOf(hr);
        if (ix == -1) {
            return null;
        } else {
            return data.get(ix);
        }
    }

//    public List<String> getDataForColumn(int index) {
//        List<String> l = new ArrayList<>();
//        for (List d : dateTimeDataList) {
//            l.add(d.get(index).toString());
//        }
//        return l;
//    }

//    private void readRS(ResultSet rs) throws SQLException, Exception {
//        int colCount = rs.getMetaData().getColumnCount();
//        while (rs.next()) {
//            List<String> rowVals = new ArrayList<>();
//            for (int i = 1; i <= colCount; i++) {
//                String resultString = rs.getString(i);
//                if (i == DATE_COL_INDEX) {
//                    resultString = addDateString(resultString);
//                    dateTime.add(resultString);
//                } else {
//                    resultString = parseNullValue(resultString);
//                    data.add(resultString);
//                }
//
//                rowVals.add(parseNullValue(resultString));
//            }
//            dateTimeDataList.add(rowVals);
//        }
//    }
//    private String parseNullValue(String v) {
//        if (v == null) {
//            return "";
//        }
//        return v;
//    }
//
//    private String addDateString(String d) throws Exception {
//        DateConvert dc = new DateConvert();
//        return dc.convert(d, Constants.DB_DATE_FORMAT, Constants.GRAPH_DATE_FORMAT);
//    }
}
