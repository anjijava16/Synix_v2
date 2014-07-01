/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model.adaptors;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.GraphData;
import za.co.cellc.synix.model.GraphDataPojo;
import za.co.cellc.synix.model.network.elements.ElementNameSingeltonFactory;
import za.co.cellc.synix.model.network.elements.ElementNameSingleton;
import za.co.cellc.synix.utilities.DateConvert;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class Adaptor {

    protected ElementNameSingleton ens;
    protected String DELIMITER = "~";
    protected List<GraphData> gdList = new ArrayList<>();
    protected ResultSet rs;
    protected int columnCount;
    protected List<String> rsData = new ArrayList<>();
    protected HtmlInputProcessor htmlIp;
    protected boolean test;

    public Adaptor(HtmlInputProcessor htmlIp, ResultSet rs, boolean test) throws Exception {
        this.htmlIp = htmlIp;
        this.rs = rs;
        this.test = test;
        ens = ElementNameSingeltonFactory.create(htmlIp.getVendor(), htmlIp.getTechnology(), htmlIp.getLevel(), test);
        try {
            columnCount = rs.getMetaData().getColumnCount();
            setRsData();
        } catch (SQLException ex) {
            Logger.getLogger(Adaptor.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error getting column count from RS: " + ex.getMessage());
            throw new Exception("Error getting column count from RS: ", ex);
        }
    }

    public boolean isDataEmpty() {
        return false;
    }

    public List<GraphData> getGdList() throws Exception {
        if (gdList.isEmpty()) {
            return null;
        }
        return gdList;
    }

    public String getGraphLabels() {
        return null;
    }

    public String getGraphLabels(int groupingID) {
        return null;
    }

    protected String getElementNameFromId(String id) {
        return ens.getName(id);
    }

    private void setRsData() throws Exception {
        try {
            while (rs.next()) {
                StringBuilder sb = new StringBuilder();
                for (int i = 1; i <= columnCount; i++) {
                    if (i > 1) {
                        sb.append(DELIMITER);
                    }
                    sb.append(rs.getString(i));
                }
                rsData.add(sb.toString());
            }
        } catch (SQLException ex) {
            Logger.getLogger(Adaptor.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error converting RS to List: " + ex.getMessage());
            throw new Exception("Error converting RS to List: ", ex);
        }
    }

    protected String getDateString(String d) throws Exception {
        DateConvert dc = new DateConvert();
        return dc.convert(d, Constants.GRAPH_DATE_FORMAT, Constants.GRAPH_DATE_FORMAT);
    }

    protected String parseNullValue(String v) {
        if (v == null) {
            return "";
        }
        return v;
    }
}
