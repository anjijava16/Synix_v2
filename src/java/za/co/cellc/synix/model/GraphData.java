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
    private String networkElementId;

//    public void setDateTimeDataList(List<List> dateTimeDataList) {
//        this.dateTimeDataList = dateTimeDataList;
//    }
    public void setData(List<String> data) {
        this.data = data;
    }

    public void setDateTime(List<String> dateTime) {
        this.dateTime = dateTime;
    }

    public String getNetworkElementId() {
        return networkElementId;
    }

    public void setNetworkElementId(String networkElementId) {
        this.networkElementId = networkElementId;
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
            return "";
        } else {
            return data.get(ix);
        }
    }

    public boolean equals(String networkElementId) {
        return this.networkElementId.equalsIgnoreCase(networkElementId);
    }

}
