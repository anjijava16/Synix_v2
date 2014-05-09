/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.model.GraphDataPojo;

/**
 *
 * @author Pierre.Venter
 */
public class NonAggregationAdaptor extends Adaptor implements AdaptorInterface {

    private List<String> neIDs = new ArrayList<>();
    private String currentNeId = null;
    private int NETWORK_ELEMENT_IX = 0;
    private int DATE_TIME_IX = 1;
    private int VALUE_IX = 2;
    private String graphLabels;

    public NonAggregationAdaptor(ResultSet rs, boolean test) throws Exception {
        super(rs, test);
    }

    @Override
    public List<GraphData> getGdList() throws Exception {
        if (gdList.isEmpty()) {
            convertDataListToGraphDataObjects();
        }
        return super.getGdList();
    }

    @Override
    public String getGraphLabels() { //this recipy specific for each adaptor
        if (graphLabels == null) {
            convertSelectionToGraphLabels();
        }
        return graphLabels;
    }

    @Override
    public void convertDataListToGraphDataObjects() throws Exception {
        List<String> data = new ArrayList<>();
        List<String> dateTime = new ArrayList<>();
        for (String rsd : rsData) {
            if (!foundNextNetworkElementId(rsd)) {
                data.add(getValueFromString(rsd));
                dateTime.add(getDateTimeFromString(rsd));
            } else {
                GraphData gd = makeGraphDataObject(data, dateTime);
                gdList.add(gd);
                data = new ArrayList<>();
                dateTime = new ArrayList<>();
                data.add(getValueFromString(rsd));
                dateTime.add(getDateTimeFromString(rsd));
            }
        }
        GraphData gd = makeGraphDataObject(data, dateTime);
        gdList.add(gd);
    }

    private GraphData makeGraphDataObject(List<String> data, List<String> dateTime) {
        GraphData gd = new GraphData();
        gd.setData(data);
        gd.setDateTime(dateTime);
        return gd;
    }

    private boolean foundNextNetworkElementId(String rsd) {
        String neId = getNetworkElementIdFromString(rsd);
        if (currentNeId == null) {
            currentNeId = neId;
            neIDs.add(neId);
            return false;
        } else if (!currentNeId.equals(neId)) {
            currentNeId = neId;
            neIDs.add(neId);
            return true;
        }
        return false;
    }

    private String getNetworkElementIdFromString(String s) {
        String[] ar = s.split(DELIMITER);
        return ar[NETWORK_ELEMENT_IX];
    }

    private String getDateTimeFromString(String s) throws Exception {
        String[] ar = s.split(DELIMITER);
        String d = getDateString(ar[DATE_TIME_IX]);
        return d;
    }

    private String getValueFromString(String s) {
        String[] ar = s.split(DELIMITER);
        String v = parseNullValue(ar[VALUE_IX]);
        return v;
    }

    @Override
    public void convertSelectionToGraphLabels() {
        StringBuilder sb = new StringBuilder();
        sb.append("'");
        sb.append(Constants.DATE_TIME_COL);
        sb.append("'");
        for (String neId : neIDs) {
            sb.append(",'");
            sb.append(getNetworkElementName(neId));
            sb.append("'");
        }
        graphLabels = sb.toString();
    }

    private String getNetworkElementName(String neID) {
        return ens.getName(neID);
    }
}
