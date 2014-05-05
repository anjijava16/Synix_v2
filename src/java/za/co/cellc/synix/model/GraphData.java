/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.utilities.DateConvert;

/**
 *
 * @author Pierre.Venter
 */
public class GraphData implements GraphDataInterface {

    private int DATE_COL_INDEX = 1;
    private List<List> dateTimeDataList = new ArrayList<>();
    private List<String> data = new ArrayList<>();
    private List<String> dateTime = new ArrayList<>();

    @Override
    public void dataFromRS(ResultSet rs) {
        try {
            readRS(rs);
        } catch (SQLException ex) {
            Logger.getLogger(GraphData.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(GraphData.class.getName()).log(Level.SEVERE, null, ex);
        }
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

    @Override
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

    public List<String> getDataForColumn(int index) {
        List<String> l = new ArrayList<>();
        for (List d : dateTimeDataList) {
            l.add(d.get(index).toString());
        }
        return l;
    }

    private void readRS(ResultSet rs) throws SQLException, Exception {
        while (rs.next()) {
            List<String> rowVals = new ArrayList<>();
            for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                String resultString = rs.getString(i);
                if (i == DATE_COL_INDEX) {
                    resultString = addDateString(resultString);
                    dateTime.add(resultString);
                } else {
                    resultString = parseNullValue(resultString);
                    data.add(resultString);
                }

                rowVals.add(parseNullValue(resultString));
            }
            dateTimeDataList.add(rowVals);
        }
    }

    private String parseNullValue(String v) {
        if (v == null) {
            return "";
        }
        return v;
    }

    private String addDateString(String d) throws Exception {
        DateConvert dc = new DateConvert();
        return dc.convert(d, Constants.DB_DATE_FORMAT, Constants.JAVA_DATE_FORMAT);
    }
}
