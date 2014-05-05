/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Pierre.Venter
 */
public class GraphData implements GraphDataInterface {

    private int DATE_COL_INDEX = 1;
    private List<List> dataList = new ArrayList<>();

    @Override
    public void dataFromRS(ResultSet rs) {
        try {
            readRS(rs);
        } catch (SQLException ex) {
            Logger.getLogger(GraphData.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String toString() {
        String data = "";
        for (int i = 0; i < dataList.size(); i++) {
            String dataRow = "";
            for (int j = 0; j < dataList.get(i).size(); j++) {
                dataRow += "," + dataList.get(i).get(j);
            }
            data += dataRow.substring(1) + "\\" + "n";
        }
        return data;
    }

    @Override
    public GraphData getGraphData() {
        return this;
    }

    public List<String> getDataForColumn(int index) {
        List<String> l = new ArrayList<>();
        for (List d : dataList) {
            l.add(d.get(index).toString());
        }
        return l;
    }

    private void readRS(ResultSet rs) throws SQLException {
        while (rs.next()) {
            List<String> rowVals = new ArrayList<>();
            for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                String resultString = rs.getString(i);
                if (i == DATE_COL_INDEX) {
                    resultString = addDateString(resultString);
                }

                rowVals.add(parseNullValue(resultString));
            }
            dataList.add(rowVals);
        }
    }

    private String parseNullValue(String v) {
        if (v == null) {
            return "";
        }
        return v;
    }

    private String addDateString(String d) {
        return d.replace("-", "/");
    }
}
