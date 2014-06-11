/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.utilities;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.cellc.synix.constants.Constants;

/**
 *
 * @author Pierre.Venter
 */
public class DateConvert {

    public String convert(String dateStr, String sourceFormat, String targetFormat) throws Exception {
        SimpleDateFormat sdfS = new SimpleDateFormat(sourceFormat);
        try {
            Date dS = (Date) sdfS.parse(dateStr);
            DateFormat df = new SimpleDateFormat(targetFormat);
            return df.format(dS);
        } catch (ParseException ex) {
            System.out.println("Error converting date: " + ex.getMessage());
            throw new Exception("Error converting date: " + ex.getMessage());
        }
    }

    public String dateStringToUTCdate(String dateStr, String format) throws Exception {
        StringBuilder sb = new StringBuilder("Date.UTC(");
        Date d = stringToDate(dateStr, format);
        sb.append(getYear(d)).append(", ");
        sb.append(getMonth(d)).append(", ");
        sb.append(getDay(d)).append(", ");
        sb.append(getHour(d)).append(", 0, 0)");
        return sb.toString();
    }

     private String getHour(Date d) throws Exception {
        Calendar c = new GregorianCalendar();
        c.setTime(d);
        return String.valueOf(c.get(Calendar.HOUR_OF_DAY));
    }
     
    private String getDay(Date d) throws Exception {
        Calendar c = new GregorianCalendar();
        c.setTime(d);
        return String.valueOf(c.get(Calendar.DAY_OF_MONTH));
    }

    private String getMonth(Date d) throws Exception {
        Calendar c = new GregorianCalendar();
        c.setTime(d);
        int m = c.get(Calendar.MONTH);
        return String.valueOf(m);
    }

    private String getYear(Date d) throws Exception {
        GregorianCalendar c = new GregorianCalendar();
        c.setTime(d);
        return String.valueOf(c.get(Calendar.YEAR));
    }

    private Date stringToDate(String dateStr, String format) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        try {
            return sdf.parse(dateStr);
        } catch (ParseException ex) {
            Logger.getLogger(DateConvert.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error parsing date string " + dateStr + " format " + format);
            throw new Exception("Error parsing date string " + dateStr + " format " + format);
        }
    }
}
