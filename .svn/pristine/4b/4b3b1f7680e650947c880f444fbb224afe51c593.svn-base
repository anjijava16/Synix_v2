package za.co.cellc.synix.controllers;

import org.apache.commons.codec.binary.Base64;

public class Encryption {
	final int OTP_PAD_SIZE = 256;// 48;

	private int[] oneTimePad = new int[OTP_PAD_SIZE];
	private int[] oneTimePadDec = new int[OTP_PAD_SIZE];
	
	
	
	public Encryption(){
		initilizeOneTimePad(); 
	}
	
	public void sqlInjectionTrap(String toTest)  throws Exception {
		String str=toTest.toLowerCase();
		boolean fails=false;
		if(str.contains("select")){
			fails=true;
		}
		if(str.contains("insert")){
			fails=true;
		}
		if(str.contains("update")){
			fails=true;
		}
		if(str.contains("delete")){
			fails=true;
		}
		if(str.contains("drop")){
			fails=true;
		}
		if(str.contains("create")){
			fails=true;
		}
		if(fails){
			throw new Exception("SQL Injection caught");
		}
	}
	
	public String encrypt(String message) {
		String encrypted=otpEncrypt( message);
		byte[] encryptedBytes=base64Encode(encrypted.getBytes());
		
		return new String(encryptedBytes);
	}
	
	public String decrypt(String message)  throws Exception {
		String decrypted=null;
		byte[] decryptedBytes=base64Decode(message.getBytes());
		try {
			decrypted=new String(decryptedBytes);
			decrypted=otpDecrypt(decrypted);
		} catch (Exception e) {
			System.out.println("decrypt failed to Decrypt string  with error" + e.getMessage() + " " + e.getCause());
			e.getStackTrace();
			throw new Exception( "decrypt failed to Decrypt string  with error ", e);
		}
		
		return decrypted;
		
	}
	
	public String otpEncrypt(String message) {
		char theCh, ch;
		StringBuilder st = new StringBuilder();

		for (int i = 0; i < message.length(); i++) {
			ch = message.charAt(i);
			theCh = (char) oneTimePad[ch];

			st.append(theCh);
		}

		return st.toString();
	}
	public String otpDecrypt(String message) throws Exception {
		StringBuilder st = new StringBuilder();
		char theCh, ch;

		try {
			for (int i = 0; i < message.length(); i++) {
				ch = message.charAt(i);
				theCh = (char) oneTimePadDec[ch];

				st.append(theCh);
			}
		} catch (Exception e) {
			System.out.println("padDecrypt failed to Decrypt string  with error" + e.getMessage() + " " + e.getCause());
			e.getStackTrace();
			throw new Exception( "padDecrypt failed to Decrypt string  with error ", e);
		}
		return st.toString();
	}
	
	
	private void initilizeOneTimePad(){

		for (int j = 0; j < OTP_PAD_SIZE; j++) {
			oneTimePadDec[j] = -1;
			oneTimePad[j] = 255-j;
		}

//		oneTimePad=makeBuiltInOneTimePad();
		
		for (int j = 0; j < OTP_PAD_SIZE; j++) {
			oneTimePadDec[oneTimePad[j]] = j;
		}
	}

    private byte[] base64Encode(byte[] Databytes){

    	byte[] bytes = Base64.encodeBase64(Databytes);
    	return bytes;
    }
    

    private byte[] base64Decode(byte[] Databytes){

    	byte[] bytes = Base64.decodeBase64(Databytes);
    	return bytes;
    }
	
	private int[] makeBuiltInOneTimePad(){
		int[] builtInPad=
		{80,50,234,221,203,51,160,188,71,163,220,79,164,239,202,249,210,89,27,44,57,247,241,200,193,254,231,
				172,52,232,102,30,179,233,98,229,183,156,8,101,167,74,78,178,211,18,12,165,199,69,37,42,166,
				77,194,244,96,93,67,95,21,227,0,35,46,60,155,1,14,13,22,70,236,213,10,84,182,49,175,217,40,
				82,158,250,190,23,73,97,25,228,88,161,222,206,63,223,45,248,36,186,184,207,55,19,246,87,216,
				65,212,205,3,180,91,4,170,224,240,85,253,76,62,251,173,192,31,43,61,6,162,75,235,209,17,226,
				174,9,28,225,32,242,68,245,47,59,11,177,83,196,157,16,187,191,41,159,208,204,39,171,29,189,
				169,168,219,100,252,90,24,48,99,215,181,81,154,197,56,7,185,72,53,33,34,20,86,238,237,2,195,
				230,214,26,64,176,38,201,92,255,5,66,218,15,243,58,198,94,153,54,103,104,105,106,107,108,109,
				110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,
				133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152};
		
		return builtInPad;
	}

}
