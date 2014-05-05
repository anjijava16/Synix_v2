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
public class AjaxInputFormatter {

    private String JSON_DELIMITER = "&";
    private char[] SPACE_CHAR = Character.toChars(32);
    private char[] SQ_CHAR = Character.toChars(34);

    public StringBuilder parseRequest(HttpServletRequest request) {
        StringBuilder sb = new StringBuilder();
        Enumeration<String> paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String param = paramNames.nextElement();
            String inputString = addJSONdelimiter((removeBraces(removeSQ(param))));
            String[] split = inputString.split(JSON_DELIMITER);
            for (String s : split) {
                if (isArray(s)) {
                    s = parseArrayStrToString(s);
                }
                if (!s.isEmpty()) {
                    sb.append(JSON_DELIMITER).append(s);
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
