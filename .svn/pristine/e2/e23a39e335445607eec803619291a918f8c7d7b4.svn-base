/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author z0006cpz
 */
public class ResultsetParser {

    private String CHART_DATA_DELIMITER = ",";
    private String DELIMITER = "<~>";
    private int DATE_COL_INDEX = 1;
    private ResultSet rs;
    private List<String> labels = new ArrayList<>();
    private List<String> data = new ArrayList<>();
    private List<String> axis = new ArrayList<>();
    private boolean multiRSchart = false;
    private char[] sQ = Character.toChars(34);
    private float target;

    public ResultsetParser() {
        labels.clear();
        data.clear();
    }

    public float getTarget() {
        return target;
    }

    public String getCHART_DATA_DELIMITER() {
        return CHART_DATA_DELIMITER;
    }

    public boolean isMultiRSchart() {
        return multiRSchart;
    }

    public List<String> getAxis() {
        return axis;
    }

    public String getLabels() {
        return lablesToString();
    }

    public String getData() {
        return dataToString();
    }

    public boolean parseRS(ResultSet rs, float target) {
        this.rs = rs;
        this.target = target;
        try {
            if (rs != null) {
                setLables();
                setData();
                closeRS();
            }
        } catch (SQLException ex) {
            System.out.println(ex);
            return false;
        }
        return !axis.isEmpty();
    }

    private void setLables() throws SQLException {
        for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
            if (!isAxisColumn(i)) {
                labels.add(rs.getMetaData().getColumnName(i));
            }
        }
        addTargetLable();
        setMultiRSchart();
    }

    private void addTargetLable() {
        labels.add(1, "Target");
    }

    private boolean isAxisColumn(int index) {
        int i = index % 2;
        if (i == 0) {
            return true;
        }
        return false;
    }

    private void setMultiRSchart() {
        multiRSchart = labels.size() > 2;
    }

    private void setData() throws SQLException {
        long row = 0;
        while (rs.next()) {
            String d = "";
            for (int i = 1; i <= rs.getMetaData().getColumnCount(); i++) {
                String resultString = rs.getString(i);
                if (!isAxisColumn(i)) {
                    if (i == DATE_COL_INDEX) {
                        resultString = addDateString(resultString) + DELIMITER + target;
                    }
                    d += DELIMITER + resultString;
                } else if (row == 0) {
                    setAxis(resultString);
                }
            }
            insertData(d);
            row++;
        }
    }

    private void setAxis(String location) {
        axis.add(location);
    }

    private String addDateString(String d) {
        return "new Date(" + sQ[0] + d + sQ[0] + ")";
    }

    private void insertData(String d) {
        d = "[" + d.substring(DELIMITER.length()) + "]";
        data.add(d);
    }

    private String lablesToString() {
        String out = "";
        if (labels.isEmpty()) {
            return "";
        }
        for (String l : labels) {
            out += CHART_DATA_DELIMITER + sQ[0] + l.replace(CHART_DATA_DELIMITER, "") + sQ[0];
        }
        return out.substring(CHART_DATA_DELIMITER.length());
    }

    private String dataToString() {
        String out = "";
        if (data.isEmpty()) {
            return "";
        }
        for (String d : data) {
            out += CHART_DATA_DELIMITER + formatDateDelimiter(d);
        }
        return out.substring(CHART_DATA_DELIMITER.length());
    }

    private String formatDateDelimiter(String str) {
        return str.replace(DELIMITER, CHART_DATA_DELIMITER);
    }

    private void closeRS() throws SQLException {
        rs.close();
    }
}
