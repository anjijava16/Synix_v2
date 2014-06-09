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
import java.util.Locale;
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

    public String dateStringToUTCdate(String dateStr, String sourceFormat) throws Exception {

    }
}
