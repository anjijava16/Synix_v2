/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.view.HtmlInputProcessor;

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

    public NonAggregationAdaptor(HtmlInputProcessor htmlIp, ResultSet rs, boolean test) throws Exception {
        super(htmlIp, rs, test);
    }

    public boolean isDataEmpty() {
        return rsData.isEmpty();
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
        String neId = "";
        for (String rsd : rsData) {
            neId = getNetworkElementIdFromString(rsd);
            if (!foundNextNetworkElementId(neId)) {
                data.add(getValueFromString(rsd));
                dateTime.add(getDateTimeFromString(rsd));
            } else {
                String uNe = getPenultimateNeIdFromList();
                GraphData gd = makeGraphDataObject(uNe, data, dateTime);
                gdList.add(gd);
                data = new ArrayList<>();
                dateTime = new ArrayList<>();
                data.add(getValueFromString(rsd));
                dateTime.add(getDateTimeFromString(rsd));
            }
        }
        GraphData gd = makeGraphDataObject(currentNeId, data, dateTime);
        gdList.add(gd);
    }

    private GraphData makeGraphDataObject(String neId, List<String> data, List<String> dateTime) throws Exception {
        GraphData gd = new GraphData();
        gd.setNetworkElementId(getElementNameFromId(neId));
        gd.setData(data);
        gd.setDateTime(dateTime);
        return gd;
    }

    private String getPenultimateNeIdFromList() throws Exception {
        if (neIDs.size() > 1) {
            return neIDs.get(neIDs.size() - 2);
        } else if (neIDs.size() > 0) {
            return neIDs.get(0);
        }
        throw new Exception("Error getting penultimate ID");
    }

    private boolean foundNextNetworkElementId(String neId) {
//        String neId = getNetworkElementIdFromString(rsd);
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
