/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.formatting;

import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Pierre.Venter
 */
public class JSInputFormatter {

    private String JSON_DELIMITER = "&";
    private char[] SPACE_CHAR = Character.toChars(32);
    private char[] SQ_CHAR = Character.toChars(34);

    public StringBuilder parseRequest(HttpServletRequest request) {
        //"&kpiName=CELL_AVAILABILITY&series=GTIBN1&dates=Tue Nov 12 2013 13:00:00 GMT 0200 (South Africa Standard Time)"
        StringBuilder sb = new StringBuilder();
        Enumeration<String> paramNames = request.getParameterNames();        
        while (paramNames.hasMoreElements()) {
            String param = paramNames.nextElement();
            String[] values = request.getParameterValues(param);
            for (String v : values) {
                if (!v.isEmpty()) {
                    sb.append(JSON_DELIMITER).append(param).append("=").append(v);
                }
            }
        }
        return sb;
    }

    private String parseArrayStrToString(String s) {
        String parameter = getParamterName(s);
        s = extractDataFromArrayString(s);
        if (s.isEmpty()) {
            return "";
        }
        return parameter + "=" + s.replace(",", JSON_DELIMITER + parameter + "=");
    }

    private String extractDataFromArrayString(String s) {
        return s.substring(s.indexOf("[") + 1, s.lastIndexOf("]"));
    }

    private String getParamterName(String s) {
        return s.substring(0, s.indexOf(":"));
    }

    private boolean isArray(String s) {
        return s.contains("[");
    }

    private String replaceSPACE_CHARS(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == SPACE_CHAR[0]) {
            } else {
                sb.append(s.charAt(i));
            }
        }
        return sb.toString();
    }

    private String removeSQ(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == SQ_CHAR[0]) {
            } else {
                sb.append(s.charAt(i));
            }
        }
        return sb.toString();
    }

    private String removeBraces(String s) {
        s = s.replace("{", "");
        return s.replace("}", "");
    }

    private String addJSONdelimiter(String s) {
        return s.replace("],", "]," + JSON_DELIMITER);
    }
}
