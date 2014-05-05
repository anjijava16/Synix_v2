/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.persistance;

/**
 *
 * @author Pierre.Venter
 */
public class SQL_Query implements SQL_QueryInterface {

    @Override
    public String limitQuery(String q, int limit) {
        return addLimitation(q, limit);
    }

    private String addLimitation(String q, int limit) {
        return "SELECT * FROM (" + q + ") WHERE ROWNUM <= " + limit;
    }
}
