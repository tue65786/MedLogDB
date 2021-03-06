package com.medlog.medlogmobile;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Debug;
import android.os.Parcelable;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.medlog.medlogmobile.util.NetConnStatus;
import com.medlog.medlogmobile.vo.PatientVO;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;


/**
 * edlog Sign in
 */
public class LoginActivity extends AppCompatActivity implements LoaderCallbacks<Cursor> {


    /**
     * Keep track of the login task
     */
    private UserLoginTask mAuthTask = null;

    // UI references.
    private AutoCompleteTextView mEmailView;
    private EditText mPasswordView;
    private View mProgressView;
    private View mLoginFormView;

    //Local instances.
    SharedPreferences spf;
    private PatientVO user, storedUser;


    public static Intent createIntent(Context context) {
        Intent intent = new Intent(context, LoginActivity.class);
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Get local prefs
        spf = getPreferences(MODE_PRIVATE);
        try {
            if (!spf.getBoolean(getString(R.string.PREF_EULA), false))
                NewMessageNotification.eulaAlert(this).show();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            Log.e("eula", null, e);
            e.printStackTrace();
        }
        setContentView(R.layout.activity_login);
        // Set up the login form.
        mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
        populateAutoComplete();
        //load user
        if (spf.contains(getString(R.string.p_usr_str))) {
            storedUser = PatientVO.fromJSON(spf.getString(getString(R.string.p_usr_str), "{}"));
        }
        mPasswordView = (EditText) findViewById(R.id.password);
        mPasswordView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == R.id.login || id == EditorInfo.IME_NULL) {
                    attemptLogin();
                    return true;
                }
                return false;
            }
        });

        Button mEmailSignInButton = (Button) findViewById(R.id.email_sign_in_button);
        mEmailSignInButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });

        mLoginFormView = findViewById(R.id.login_form);
        mProgressView = findViewById(R.id.login_progress);
    }

    private void populateAutoComplete() {
        getLoaderManager().initLoader(0, null, this);
    }


    /**
     * Attempts to sign in or register the account specified by the login form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual login attempt is made.
     * <p>
     * TODO Check for offline credentials.
     */
    private void attemptLogin() {
        if (mAuthTask != null) {
            return;
        }

        // Reset errors.
        mEmailView.setError(null);
        mPasswordView.setError(null);

        // Store values at the time of the login attempt.
        String email = mEmailView.getText().toString();
        final String password = mPasswordView.getText().toString();

        boolean cancel = false;
        View focusView = null;

        // Check for a valid password, if the user entered one.
        if (!TextUtils.isEmpty(password) && !isPasswordValid(password)) {
            mPasswordView.setError(getString(R.string.error_invalid_password));
            focusView = mPasswordView;
            cancel = true;
        }

        // Check for a valid email address.
        if (TextUtils.isEmpty(email)) {
            mEmailView.setError(getString(R.string.error_field_required));
            focusView = mEmailView;
            cancel = true;
        } else if (!isEmailValid(email)) {
            mEmailView.setError(getString(R.string.error_invalid_email));
            focusView = mEmailView;
            cancel = true;
        }

        if (cancel) {
            // There was an error; don't attempt login and focus the first
            // form field with an error.
            focusView.requestFocus();
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user login attempt.
            showProgress(true);
            mAuthTask = new UserLoginTask(email, password);
            mAuthTask.execute((Void) null);

        }
    }

    private boolean isEmailValid(String email) {
        //TODO: Replace this with your own logic
        return true;//email.contains("@");
    }

    private boolean isPasswordValid(String password) {
        //TODO: Replace this with your own logic
        return password.length() > 1;
    }

    /**
     * Shows the progress UI and hides the login form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
            mLoginFormView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
            mProgressView.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
            mLoginFormView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

    @Override
    public Loader<Cursor> onCreateLoader(int i, Bundle bundle) {
        return new CursorLoader(this,
                // Retrieve data rows for the device user's 'profile' contact.
                Uri.withAppendedPath(ContactsContract.Profile.CONTENT_URI,
                        ContactsContract.Contacts.Data.CONTENT_DIRECTORY), ProfileQuery.PROJECTION,

                // Select only email addresses.
                ContactsContract.Contacts.Data.MIMETYPE +
                        " = ?", new String[]{ContactsContract.CommonDataKinds.Email
                .CONTENT_ITEM_TYPE},

                // Show primary email addresses first. Note that there won't be
                // a primary email address if the user hasn't specified one.
                ContactsContract.Contacts.Data.IS_PRIMARY + " DESC");
    }

    @Override
    public void onLoadFinished(Loader<Cursor> cursorLoader, Cursor cursor) {
        List<String> emails = new ArrayList<>();
        cursor.moveToFirst();
        while (!cursor.isAfterLast()) {
            emails.add(cursor.getString(ProfileQuery.ADDRESS));
            cursor.moveToNext();
        }

        addEmailsToAutoComplete(emails);
    }

    @Override
    public void onLoaderReset(Loader<Cursor> cursorLoader) {

    }

    private void addEmailsToAutoComplete(List<String> emailAddressCollection) {
        //Create adapter to tell the AutoCompleteTextView what to show in its dropdown list.
        ArrayAdapter<String> adapter =
                new ArrayAdapter<>(LoginActivity.this,
                        android.R.layout.simple_dropdown_item_1line, emailAddressCollection);

        mEmailView.setAdapter(adapter);
    }


    private interface ProfileQuery {
        String[] PROJECTION = {
                ContactsContract.CommonDataKinds.Email.ADDRESS,
                ContactsContract.CommonDataKinds.Email.IS_PRIMARY,
        };

        int ADDRESS = 0;
        int IS_PRIMARY = 1;
    }

    /**
     * Represents an asynchronous login/registration task used to authenticate
     * the user.
     */
    public class UserLoginTask extends AsyncTask<Void, Void, Boolean> {
        String usr = "";
        private final String mEmail;
        private final String mPassword;

        UserLoginTask(String email, String password) {
            mEmail = email + "";
            mPassword = password + "";

        }

        @Override
        protected Boolean doInBackground(Void... params) {
            try {
                boolean hasINet = NetConnStatus.getInstance(getApplicationContext()).isOnline();
                Log.i(getString(R.string.tag_network), "Online? + " + hasINet);
                //TODO Make url builder.
                String tURL = getString(R.string.api_prefix) + "fn=login&username=" + mEmail + "&password=" + mPassword;
                Log.i("KK", tURL);


                if (hasINet) {

                    usr = LoginActivity.getUrlSource(tURL);

                    try {
                        user = PatientVO.fromJSON(usr);
                        Log.i(getString(R.string.tag_vos), user.toString());

                        //Store credentials in local db
                        boolean isValidUser = (user != null && user.getPatientID() > 0);
                        if (isValidUser) {
                            if (!spf.edit().putString(getString(R.string.p_usr_str), usr).commit()) {
                                Log.w(getString(R.string.tag_store_lcl), "Could not commit user");
                            }

                        }
                        Log.i(getString(R.string.tag_async), "JSON RESPONSE: " + usr);
                        return isValidUser;
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    if (storedUser != null && storedUser.getPatientID() > 0) {
                        if (mEmail.equalsIgnoreCase(storedUser.getUserName()) || mEmail.equals(storedUser.getEmail())) {
                            if (mPassword.equals(storedUser.getUserPassword())) {
                                user = storedUser;
                                if (spf.contains(getString(R.string.p_usr_str))) {
                                    usr = spf.getString(getString(R.string.p_usr_str), "{}");
                                }
                                Log.i(getString(R.string.tag_store_lcl), " Logged in from local : " + usr);
                                return true;
                            }
                        }
                    }
                    return false;
                }
            } catch (Exception e) {
                Log.i(getString(R.string.tag_async), "", e);
                return false;
            }
            return false;
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mAuthTask = null;
            showProgress(false);

            //Logged in?
            if (success) {
                Toast.makeText(getApplicationContext(), new StringBuilder().append("Hello ").append(user.getFirstName()).append(", welcome back!").toString(), Toast.LENGTH_LONG).show();
                Log.i(getString(R.string.tag_store_lcl), "SAVE PREFS: " + spf.edit().putInt(getString(R.string.p_uid), user.getPatientID()).commit());
                // finish();

                //Load main activity
                //----------------------
                Intent mainI = new Intent(LoginActivity.this, MainActivity.class);
                //mainI.putExtra(getString(R.string.int_user), (Parcelable) user);
                mainI.putExtra(getString(R.string.intent_val_user_json), usr);
                if (getString(R.string.DEBUG).equals("true")) {
                    printPrefs();
                }
                startActivity(mainI);
            } else {
                mPasswordView.setError(getString(R.string.error_incorrect_password));
                mPasswordView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            showProgress(false);
        }
    }

    /**
     * Loads data from URL
     *
     * @param url
     * @return Contents of http response
     * @throws IOException
     */
    private static String getUrlSource(String url) throws IOException {

        URL mURL = new URL(url);

        URLConnection urlConn = mURL.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(
                urlConn.getInputStream(), "UTF-8"));
        String inputLine;
        StringBuilder a = new StringBuilder();
        while ((inputLine = in.readLine()) != null)
            a.append(inputLine);
        in.close();

        return a.toString();
    }

    private void printPrefs() {
        if (spf != null && spf.getAll().size() > 0) {
            for (String key : spf.getAll().keySet()) {
                Object o = spf.getAll().get(key);
                try {
                    Log.i(getString(R.string.tag_debug), String.format("Key:%s = %s", key, o.toString()));
                } catch (Exception e) {
                }
            }
        } else {
            Log.w(getString(R.string.tag_debug), "NO PREFS FOUND!");
        }
    }

}

