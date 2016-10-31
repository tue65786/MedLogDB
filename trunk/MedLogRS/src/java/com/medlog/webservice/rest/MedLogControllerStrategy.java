/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.medlog.webservice.rest;

import com.google.gson.*;
import com.google.gson.annotations.*;
import com.medlog.webservice.CONST.*;
import static com.medlog.webservice.CONST.API_ACTIONS.*;
import static com.medlog.webservice.CONST.SETTINGS.*;
import com.medlog.webservice.dao.*;
import com.medlog.webservice.rest.helpers.*;
import com.medlog.webservice.sql.*;
import com.medlog.webservice.util.*;
import com.medlog.webservice.vo.*;
import java.util.*;
import java.util.logging.*;
import javax.servlet.http.*;
import jdk.nashorn.api.scripting.*;

/**
 * Strategies for connecting to data.
 *
 * @author (c)2016
 */
public class MedLogControllerStrategy {

@Expose(deserialize = false, serialize = false)
private static final Logger LOG = Logger.getLogger( MedLogControllerStrategy.class.getName() );
@Expose(deserialize = true, serialize = true)
public boolean success;
@Expose(deserialize = true, serialize = true)
public String responseMessage = "";

public MedLogControllerStrategy(HttpServletRequest _request, HttpServletResponse _response, RES_ENUM res, String fn) {
   this.request = _request;
   this.response = _response;
   this.session = request.getSession();
   this.res = res;
   this.fn = fn;
   success = false;
}

/**
 * Lookup and exec API Functions
 *
 * @param dbc Connection
 * @return JSON
 */
public String execute(DbConnection dbc) {
   Gson g = new Gson();
   boolean apiCanExecute = true;
   MedLogDAO dao;
   
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.execute() " + res.name() + res.toString() );

   ///  -  ::}
   //     __
   //    /o \___Login
   //    \__/-="="`
   /// -  -  -  - :
   if ( getCurrentUser() == null ) {
	  if ( !res.equals( RES_ENUM.API_RESOURCE_PATIENT )
		   || ( StrUtl.matchOR( fn, "login",
								API_FUNCTION_INSERT ) ) ) {
		 apiCanExecute = false;
	  }
   }

   if ( !apiCanExecute ) {
	  responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR],
										   "Not logged in." );
   } else {
	  dao = new MedLogDAO( dbc, getCurrentUser() );
	  switch ( res ) {
		 /////////   __________
		 //         |dear DiARY|
		 //         |&&& ======|
		 //         |[_] =====+|
		 //         |=== ===?!#|
		 //         |__________|		 
		 ///////////////////////////////////		  
		 case API_RESOURCE_DIARY:
			if ( StrUtl.matchOR( fn, API_FUNCTION_INSERT, API_FUNCTION_UPDATE ) ) {
			   DiaryVO vo = loadDiaryFromRequest();
			   if ( fn.equalsIgnoreCase( API_FUNCTION_INSERT ) && vo.isValid( INSERT ) ) {
				  int id = dao.createDiary( vo );
				  if ( id > 0 ) {
					 success = true;
					 vo.setId( id );
					 responseMessage = g.toJson( vo );
				  } else {
					 responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR], "Diary not added." );
				  }
			   }//Insert
			   else if ( fn.equalsIgnoreCase( API_FUNCTION_UPDATE ) && vo.isValid( UPDATE ) ) {
				  success = dao.updateDiary( vo ) > 0;
				  responseMessage = StrUtl.getJSONMsg( success ? STATE_STATUS[API_ACTIONS.INFO]
						  : STATE_STATUS[API_ACTIONS.ERROR], "Diary update"
															 + ( success
																? "d"
																: " failed" ) );
			   }//Update
			} else if ( StrUtl.matchOR( fn, API_FUNCTION_FIND, API_FUNCTION_FIND_BY_KEYWORD ) ) {
			   responseMessage = getDiaryResponse( dao, g );
			}//Search
			break;

		 /////////////// {}			
		 //           .-'  '-.      
		 //          /        )                                 
		 //          |  C   o( 
		 //           \      P>tient      
		 //            )  \  /   
		 //           _ / `'
		 ////////////|      / ~  ~ - >
		 case API_RESOURCE_PATIENT:
			if ( StrUtl.matchOR( fn, API_FUNCTION_INSERT, API_FUNCTION_UPDATE ) ) {
			   PatientVO vo = loadPatientFromRequest();
			   if ( fn.equalsIgnoreCase( API_FUNCTION_INSERT ) && vo.isValid( INSERT ) ) {
				  int id = dao.createPatient( vo );
				  if ( id > 0 ) {
					 success = true;
					 vo.setPatientID( id );
					 session.setAttribute( SESSION_BEAN_USER, vo );
					 responseMessage = g.toJson( vo );
				  } else {
					 responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR], "Patient not added." );
				  }

			   } else if ( fn.equalsIgnoreCase( API_FUNCTION_UPDATE )
						   && vo.isValid( UPDATE )
						   && getCurrentUser() != null
						   && vo.getPatientID() == getCurrentUser().getPatientID()
						   && vo.getPatientID() > 0 ) {
				  //Execute
				  success = dao.updatePatient( vo );
				  if ( success ) {
					 session.setAttribute( SESSION_BEAN_USER, vo );
				  }
				  responseMessage = StrUtl.getJSONMsg( success ? STATE_STATUS[API_ACTIONS.INFO]
						  : STATE_STATUS[API_ACTIONS.ERROR],
													   " Update" + ( success
																	? "d" : " failed" ) );
			   } else {
				  responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR],
													   StrUtl.toS( fn, "?" )
													   + " params are invalid." );
			   }

			} else {//Not valid fn
			   responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR],
													StrUtl.toS( fn, "?" )
													+ " is invalid." );
			}
			break;
			
		 default:
			responseMessage = StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR],
												 " Invalid res." );
			break;

	  }
   }
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.execute()\nRESPONSE:\n=============\n"
					   + responseMessage + "\n-  |  -- - --  |  --- -- --  |  -- --- --  |  - --- --  |  --------  |  -----  |  ----\n" );
   return responseMessage;
}

public ArrayList<IEntityBase> getList() {
   ArrayList<IEntityBase> voList = null;
//   getSingle( sendDiaryToResponse( null,null ) );
   return voList;
}

public IEntityBase getSingle(ArrayList<? extends IEntityBase> voList) {
   return voList.get( 0 );
}

private String getDiaryResponse(MedLogDAO dao, Gson g) {
   ServletHelpers sh = new ServletHelpers( request, response );
   ArrayList<DiaryVO> voList = null;
   String key = sh.getStrParameter( "keyword", "" );
   if ( fn.equals( API_FUNCTION_FIND_BY_KEYWORD ) && !key.isEmpty() ) {
	  voList = dao.findDiaryByKeyword( key );
   } else if ( fn.equals( API_FUNCTION_FIND ) ) {
	  voList = dao.findDiaryByPatient();
   } else {
	  success = false;
   }

   if ( voList == null || voList.isEmpty() ) {
	  return StrUtl.getJSONMsg( STATE_STATUS[API_ACTIONS.ERROR], "No entries." );
   } else {
	  return g.toJson( voList );
   }

}

public MedicationVO loadMedicationFromRequest() {
    /*if ( getCurrentUser() == null ) {
	  System.err.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadDiaryFromRequest() -- USER NOT LOGGED IN" );
	  return null;
   }*///don't know if above is necessary or not
   ServletHelpers sh = new ServletHelpers( request, response );
   MedicationVO.Builder t = MedicationVO.builder();
   //TODO Finish request params
   t.medicationID( sh.getIntParameter( "id", sh.getIntParameter( "medicationID", 0 ) ) );
   t.patientID( getCurrentUser() );
   t.pharmID(PharmaRxOtcVO.builder().pharmID( sh.getIntParameter( "pharmid", sh.getIntParameter( "pharmID", 0 ))).build());
   t.physicianID( HealthcareProviderVO.builder().physicianID(  sh.getIntParameter( "healthcareProviderID",0)).build());
   t.instructions( sh.getStrParameter( "instructions", "" ) );
   //t.sig ?????
   t.startDate( sh.getDateParameter( "startDate", new Date() ) );
   t.endDate( sh.getDateParameter( "endDate", new Date() ) );
   t.dosage( sh.getStrParameter( "dosage", "" ) );
   t.frequencySig( sh.getStrParameter( "frequencySig", "" ) );
   t.active( sh.getBooleanParameter( "active", true ) );
   //t.tagList ???
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadMedicationFromRequest()\n==> " + t.build().toJSON() );
   return t.build();
}

/**
 * Builds patient vo from request.
 *
 * @return
 */
public PatientVO loadPatientFromRequest() {
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadPatientFromRequest()" );
   ServletHelpers sh = new ServletHelpers( request, response );
   PatientVO.Builder p = PatientVO.builder();
   //Allow id or patientID
   p.patientID( sh.getIntParameter( "id", sh.getIntParameter( "patientID", 0 ) ) );
   p.userName( sh.getStrParameter( "userName", "" ) );
   p.userPassword( sh.getStrParameter( "userPassword", "" ) );
   p.firstName( sh.getStrParameter( "firstName", "" ) );
   p.lastName( sh.getStrParameter( "lastName", "" ) );
   p.phoneHome( sh.getStrParameter( "phoneHome", "" ) );
   p.phoneMobile( sh.getStrParameter( "phoneMobile", "" ) );
   p.email( sh.getStrParameter( "email", "" ) );
   p.status( sh.getStrParameter( "status", "" ) );
   p.addressStreet( sh.getStrParameter( "addressStreet", "" ) );
   //Allow stateID or stateid
   p.addressState( StateVO.builder().stateID( sh.getIntParameter( "stateID", sh.getIntParameter( "stateid", 0 ) ) ).build() );
   p.addressCountry( sh.getStrParameter( "addressCountry", "USA" ) );
   p.addressPostalcode( sh.getStrParameter( "addressPostalcode", "" ) );
   p.dateOfBirth( sh.getDateParameter( "dateOfBirth", new Date() ) );
   p.userRole( 1 );
   p.dateJoined( sh.getDateParameter( "dateJoined", new Date() ) );
   
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadPatientFromRequest()\n==> " + p.build().toJSON() );
   return p.build();
   // sh.getStrParameter( "", "")
   //phoneHome
//   phoneMobile": null,
//  "email": null,
//  "status": null,
//  "addressStreet": "158 Edge",
//  "addressCity": "BC",
//  "addressState": {
//    "stateID": 2,
//    "stateName": "Pennsylvania",
//    "stateAbbreviation": "PA",
//    "patientList": null
//  },
//  "addressCountry": null,
//  "addressPostalcode": null,
//  "userPreferences": null,
//  "pwdLastChanged": null,
//  "lang": null,
//  "timezoneId": null,
//  "dateOfBirth": null,
//  "dateJoined": "Oct 22, 2016",
//  "picture": null,
//  "metaData": null,
//  "userRole": 1,

}
/**
 * Load from request to POJO
 * @return 
 * @see HttpServletRequest#getParameterMap() 
 * @see HealthcareProviderVO
 */
public HealthcareProviderVO loadProviderFromRequest(){
    /*if ( getCurrentUser() == null ) {
	  System.err.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadDiaryFromRequest() -- USER NOT LOGGED IN" );
	  return null;
   }*///don't know if above is necessary or not
   ServletHelpers sh = new ServletHelpers( request, response );
   HealthcareProviderVO.Builder q = HealthcareProviderVO.builder();
   q.physicianID( sh.getIntParameter( "id", sh.getIntParameter( "physicianID", 0 ) ) );
   q.lastName( sh.getStrParameter( "lastName", "" ) );
   q.firstName( sh.getStrParameter( "firstName", "" ) );
   q.specialty( sh.getStrParameter( "specialty", "" ) );
   q.phoneWork( sh.getStrParameter( "phoneWork", "" ) );
   q.phoneMobile( sh.getStrParameter( "phoneMobile", "" ) );
   //q.phonePager ???
   q.phoneFax( sh.getStrParameter( "phoneFax", "" ) );
   q.email( sh.getStrParameter( "email", "" ) );
   //q.patientLogCommunicationPreference( sh.getStrParameter( "lastName", "" ) );
   q.addressStreet( sh.getStrParameter( "addressStreet", "" ) );
   q.addressCity( sh.getStrParameter( "addressCity", "" ) );
   q.addressZip( sh.getStrParameter( "addressZip", "" ) );
   q.addressStateID( StateVO.builder().stateID( sh.getIntParameter( "stateID", sh.getIntParameter( "stateid", 0 ) ) ).build() );
   //q.patientList
   System.out.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadProviderFromRequest()\n==> " + q.build().toJSON() );
   return q.build();
}
/**
 * Translate Diary
 *
 * @return
 */

public DiaryVO loadDiaryFromRequest() {
   if ( getCurrentUser() == null ) {
	  System.err.println( "com.medlog.webservice.rest.MedLogControllerStrategy.loadDiaryFromRequest() -- USER NOT LOGGED IN" );
	  return null;
   }
   ServletHelpers sh = new ServletHelpers( request, response );
   DiaryVO.Builder t = DiaryVO.builder();
   t.id( sh.getIntParameter( "id", 0 ) );
   t.notes( sh.getStrParameter( "notes", "" ) );
   t.title( sh.getStrParameter( "title", "" ) );
   t.patientID( getCurrentUser() );
   t.mood( sh.getIntParameter( "mood", 0 ) );
   t.productivity( sh.getIntParameter( "productivity", 0 ) );
   return t.build();
}

/**
 * Retrieves current user object from session
 *
 * @see PatientVO
 * @return Patient or null
 */
private PatientVO getCurrentUser() {
   try {
	  return (PatientVO) session.getAttribute( SESSION_BEAN_USER );
   } catch (Exception e) {
	  return null;
   }
}
@Expose(deserialize = true, serialize = true)
/**
 * Request function
 */
private final String fn;
@Expose(deserialize = false, serialize = false)
/**
 * Current Request.
 */
private final HttpServletRequest request;
@Expose(deserialize = true, serialize = true)
/**
 * Request Resource
 *
 * @see DiaryVO
 * @see PatientVO
 * @see MedicationVO
 * @see PharmaRxOtcVO
 * @see HealthcareProviderVO
 * @see DietaryRestrictionVO
 */
private final RES_ENUM res;
@Expose(deserialize = false, serialize = false)
/**
 * Current Response.
 */
private final HttpServletResponse response;
@Expose(deserialize = false, serialize = false)
/**
 * Session state.
 */
private final HttpSession session;

}
