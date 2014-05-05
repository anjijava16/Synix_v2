/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.utilities;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.JSON_Parser;

/**
 *
 * @author Pierre.Venter
 */
public class HoursUtility {

    private final boolean DAILY = true;
    private final boolean HOURLY = false;
    private String selectionStr;
    private List<String> hours = new ArrayList<>();
    private String fromDate;
    private String toDate;
    private String period;

    public HoursUtility(String selection) {
        this.selectionStr = selection;
        try {
            decodeSelection();
            buildHoursList();
        } catch (Exception ex) {
            System.out.println("Error decoding selection: " + ex.getMessage());
            Logger.getLogger(HoursUtility.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void decodeSelection() throws Exception {
        JSON_Parser jp = new JSON_Parser();
        fromDate = jp.getValuesForObject("timeFrom", selectionStr).get(0);
        toDate = jp.getValuesForObject("timeTo", selectionStr).get(0);
        period = jp.getValuesForObject("period", selectionStr).get(0);
    }

    private void buildHoursList() throws Exception {
        DateListMaker dm = new DateListMaker();
        if (period.equalsIgnoreCase(Constants.Periods.HOURLY.value())) {
            hours.addAll(dm.getListOfDateHours(fromDate, toDate, HOURLY));
        } else if (period.equalsIgnoreCase(Constants.Periods.DAILY.value())) {
            hours.addAll(dm.getListOfDateHours(fromDate, toDate, DAILY));
        } else {
            throw new Exception("Invalid period: " + period);
        }
    }

    public List<String> getHours() {
        return hours;
    }

}
