/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package za.co.cellc.synix.model;

/**
 *
 * @author nickm
 */
public class UserLevel {
    
    public static final int NORMAL_USER = 0;
    public static final int TEAM_LEADER = 1;
    public static final int LINE_MANAGER = 2;
    public static final int SNR_MANAGER = 3;
    public static final int EXECUTIVE = 4;
    public static final int MANAGING_EXEC = 5;
    public static final int DIRECTOR = 6;
    
    
    int userLevel;
    String description;
    
    public UserLevel(){}
    public UserLevel(int userLevel,String description){
        this.userLevel=userLevel;
        this.description=description;    
    }

    public int getUserLevel() {
        return userLevel;
    }

    public String getDescription() {
        return description;
    }
    
    
    public String toString() {
        StringBuilder str = new StringBuilder();
        str.append("\nuserLevel : ");
        str.append(userLevel);
        str.append("\ndescription : ");
        str.append(description);

        return str.toString();
    }
    
}
