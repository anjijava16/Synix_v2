/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.formbuilders.charts.dygraph;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class Grouping {

    private String query;

    public Grouping(String query) {
        this.query = query;
    }

    public String removeObjectGrouping(String object) {
        List<Integer> indexes = getGroupByIndexes();
        for (int i = indexes.size() - 1; i >= 0; i--) {
            String grouping = getGrouping(indexes.get(i));
            if (grouping.toUpperCase().contains(object.toUpperCase())) {
                query = query.replace(grouping, "GROUP BY ");
            }
        }
        return query;
    }

    private String getGrouping(int index) {
        for (int i = index; i < query.length(); i++) {
            if (query.charAt(i) == ',') {
                return query.substring(index, i+1);
            }
            if (query.substring(index).toUpperCase().startsWith("ORDER BY")) {
                return query.substring(index, i);
            }
        }
        return "";
    }

    private List<Integer> getGroupByIndexes() {
        List<Integer> indexes = new ArrayList<>();
        int len = "GROUP BY".length();
        for (int i = 0; i < query.toCharArray().length - len; i++) {
            String val = query.substring(i, i + len);
            if (val.equalsIgnoreCase("GROUP BY")) {
                indexes.add(i);
            }
        }
        return indexes;
    }
}
