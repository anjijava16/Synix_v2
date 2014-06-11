/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.utilities;

import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class ListUtils {

    public boolean isLastItemInStrList(String item, List<String> lst) {
        int i = lst.lastIndexOf(item);
        return i == lst.size() - 1;
    }
}
