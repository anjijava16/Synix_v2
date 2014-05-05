/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author z0006cpz
 */
public class JSON_Parser {

    private String JSON_String, objectName;
    private String DELIMITER = "&";
    private String LISTBOX_DELIMITER = "%2C";

    public List<String> getValuesForObject(String objectName, String JSON_String) {
        this.objectName = objectName;
        this.JSON_String = JSON_String;
        return getValues();
    }

    private List<String> getValues() {
        List<String> values = new ArrayList<String>();
        String[] split = JSON_String.split(DELIMITER);
        for (String s : split) {
            if (objectMatch(s)) {
                if (s.contains(LISTBOX_DELIMITER)) {
                    values.addAll(Arrays.asList(getItemsFromListBox(removeSingleQuote(s.substring(s.lastIndexOf("=") + 1)))));
                    break;
                } else {
                    values.add(removeSingleQuote(s.substring(s.lastIndexOf("=") + 1)));
                }
            }
        }
        return values;
    }

    private String[] getItemsFromListBox(String s) {
        return removeIllegalChars(s.split(LISTBOX_DELIMITER));
    }

    private String[] removeIllegalChars(String[] ar) {
        String[] illegals = {"+"};
        String[] s = ar;
        for (int i = 0; i < s.length; i++) {
            for (String ill : illegals) {
                s[i] = s[i].replace(ill, "");
            }
        }
        return s;
    }

    private boolean objectMatch(String JSON_object) {
        if (JSON_object.toLowerCase().contains(objectName.toLowerCase())) {
            JSON_object = removeSingleQuote(JSON_object);
            return JSON_object.toLowerCase().startsWith(objectName.toLowerCase() + "=");
        } else {
            return false;
        }
    }

    private String removeSingleQuote(String s) {
        char[] sQ = Character.toChars(34);
        String res = "";
        for (char c : s.toCharArray()) {
            if (c != sQ[0]) {
                res += c;
            }
        }
        return res;
    }
}
