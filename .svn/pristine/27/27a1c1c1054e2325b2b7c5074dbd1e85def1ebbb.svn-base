/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class DateListMaker {

    private boolean daily;

    public List<String> getListOfDateHours(String fromDate, String toDate, boolean daily) throws Exception {
        this.daily = daily;
        List<String> listOfHours = new ArrayList<>();
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            Date startDate = (Date) formatter.parse(fromDate);
            Date endDate = (Date) formatter.parse(toDate);
            List<Date> listOfDates = listOfDates(startDate, endDate);
            listOfHours.addAll(listOfHours(listOfDates, "dd/MM/yyyy"));
        } catch (ParseException ex) {
            System.out.println("Error getting List of DateHours: " + ex.getMessage());
            throw new Exception("Error getting List of DateHours: " + ex.getMessage());
        }
        return listOfHours;
    }

    private List<Date> listOfDates(Date startDate, Date endDate) {
        List<Date> dates = new ArrayList<>();
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(startDate);
        while (calendar.getTime().before(endDate)) {
            Date date = calendar.getTime();
            dates.add(date);
            calendar.add(Calendar.DATE, 1);
        }
        return dates;
    }

    private List<String> listOfHours(List<Date> listOfDates, String format) {
        SimpleDateFormat formatter = new SimpleDateFormat(format); // "yyyyMMdd");
        List<String> listOfHours = new ArrayList<>();
        for (Date date : listOfDates) {
            String hrs = formatter.format(date);
            int maxHr = daily ? 1 : 24;
            for (int hr = 0; hr < maxHr; hr++) {
                if (hr > 9) {
                    listOfHours.add(hrs + " " + hr + ":00:00");
                } else {
                    listOfHours.add(hrs + " 0" + hr + ":00:00");
                }
            }
        }
        return listOfHours;
    }

}
