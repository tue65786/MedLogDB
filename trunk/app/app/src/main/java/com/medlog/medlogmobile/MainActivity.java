package com.medlog.medlogmobile;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Build;
import android.os.CountDownTimer;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.app.NotificationCompat;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;

import com.google.gson.GsonBuilder;
import com.medlog.medlogmobile.util.Helpers;
import com.medlog.medlogmobile.util.NetConnStatus;
import com.medlog.medlogmobile.vo.DiaryVO;
import com.medlog.medlogmobile.vo.PatientVO;
import com.medlog.medlogmobile.vo.ResponseVO;

import java.io.IOException;
import java.util.ArrayList;

import android.util.Log;
import android.widget.Toast;

import static com.medlog.medlogmobile.util.NetConnStatus.*;

/**
 * Diary Activity
 */
public class MainActivity extends AppCompatActivity {
    //Current user
    private PatientVO user;
    // UI references.
    private SeekBar sbMood;
    private SeekBar sbProd;
    private EditText txtTitle;
    private EditText txtNotes;
    private View mProgressView;
    private View mFormView;
    CountDownTimer countDownTimer;

    private static final int MY_NOTIFICATION_ID = 1;
    private NotificationManager notificationManager;
    private NotificationCompat.Builder myNotification;
    /**
     * Keep track of the submit task - disallow multiple instance.
     */
    SubmitDiaryTask mSubmitTask = null;
    ArrayList<DiaryVO> diaryVoList;
    String userString;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ActionBar ab = getSupportActionBar();
        setActionBar(ab, "Jounral Log");
//        getActionBar().setLogo(R.drawable.ml);
        // Linkup form widgets
        sbMood = (SeekBar) findViewById(R.id.sbMood);
        sbProd = (SeekBar) findViewById(R.id.sbProductivity);
        txtTitle = (EditText) findViewById(R.id.txtDiaryID);
        Button btnSubmit = (Button) findViewById(R.id.btnDiaryFormSubmit);
        txtNotes = (EditText) findViewById(R.id.txtNotes);
        mFormView = findViewById(R.id.mainact_form);
        mProgressView = findViewById(R.id.main_progress);
//        showNotice(1,user.getUserName(),"num","title"," body" );


        SeekBar.OnSeekBarChangeListener sbl = new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                //TODO indicate seekbar value.
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                String s = "productivity";

                if (seekBar.getId() == R.id.sbMood) {
                    s = "mood";
                }
                Toast.makeText(getApplicationContext(), s + " value  " +
                        seekBar.getProgress(), Toast.LENGTH_SHORT).show();
            }
        };
        //Handle form events
        btnSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                doSubmitDiary(true);
            }
        });

        sbMood.setOnSeekBarChangeListener(sbl);
        sbProd.setOnSeekBarChangeListener(sbl);
        /**
         * Pick up data sent from login
         * @see PatientVO
         */
        Intent receivedIntent = getIntent();
        //Load user info.
        if (receivedIntent != null) {

            userString = receivedIntent.getStringExtra(getString(R.string.intent_val_user_json));

            user = PatientVO.fromJSON(userString);
//            user = receivedIntent.getParcelableExtra(getString(R.string.int_user));
            if (getString(R.string.DEBUG).equals("true")) {
                Log.i(getString(R.string.tag_debug), "User  : " + user.toString());
            }
        }
        SharedPreferences spf = getPreferences(MODE_PRIVATE);           //get old user data and place them into storage
        boolean hasData = spf.getBoolean(getString(R.string.lcl_db_hasdata), false);
        if (hasData) {
            String oldData = spf.getString(getString(R.string.lcl_db_data), "");
            diaryVoList = DiaryVO.fromJSON(oldData);
            Toast.makeText(getApplicationContext(), new StringBuilder().append(diaryVoList.size() + " previous entries found.").append(getInstance(this).isOnline() ? " You are ONLINE. Syncing..." : " You are offline. Entries will be saved.").toString(), Toast.LENGTH_LONG).show();

        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.main, menu);
        return true;
    }

    @Override
    /**
     * Handle menu button events
     */
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.btnSync://Sync clicked
                if (diaryVoList != null && diaryVoList.size() > 0) {
                    showProgress(true);
                    doSubmitDiary(false);
                    return true;
                } else {
                    showProgress(true);
                    try {

                        // Add a fake sleep to tes loader
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        showProgress(false);
                    }
                    showProgress(false);
                    Toast.makeText(getApplicationContext(), new StringBuilder()
                            .append(getString(R.string.nothing_to_sync)).toString(), Toast.LENGTH_LONG).show();

                }
                break;
            case R.id.rpt://Report load
                if (user.getDiaryList() != null && user.getDiaryList().size() > 0) {
                    Intent mainI = new Intent(MainActivity.this, ReportActivity.class);
                    mainI.putExtra(getString(R.string.intent_val_user_json), userString);

// mainI.putExtra(getString(R.string.int_user), (Parcelable) user);
                    startActivity(mainI);
                    return true;
                } else {
                    return false;
                }

        }
        return false;
    }

    private void doSubmitDiary(boolean withForm) {
        if (mSubmitTask != null) {
            return;//Task already running.
        }
        if (withForm) {
            String notes = "";
            if (txtNotes != null) {
                notes = Helpers.toS(txtNotes.getText().toString(), "");
            }
            if (diaryVoList == null) {
                diaryVoList = new ArrayList<DiaryVO>();
            }
            diaryVoList.add(DiaryVO.builder().mood(sbMood.getProgress()).productivity(sbProd.getProgress())
                    .title(Helpers.toS(txtTitle.getText().toString(), "Entry")).notes(notes).build());
        }
        boolean amIOnline = getInstance(this).isOnline();
        if (amIOnline) {
            //TODO Submit diary
            showProgress(true);
            mSubmitTask = new SubmitDiaryTask(diaryVoList, user.getPatientID(), true);


            mSubmitTask.execute((Void) null);
        } else {
            countDownTimer = new CountDownTimer(3000, 500) {

                public void onTick(long millisUntilFinished) {
                    Log.d(getString(R.string.tag_debug), "tick....");
                }

                public void onFinish() {
                    showProgress(false);
                }
            }.start();

            Log.d(getString(R.string.tag_debug), "offline store list size:" + diaryVoList.size());


        }
        resetForm();
    }

    /**
     * Clears form.
     */
    private void resetForm() {
        sbProd.setProgress(0);
        sbMood.setProgress(0);
        txtTitle.setText("");
        txtNotes.setText("");

    }

    /**
     * Process diary submit
     */
    public class SubmitDiaryTask extends AsyncTask<Void, Void, Integer> {

        private final int patientID;
        ArrayList<DiaryVO> voList;

        public SubmitDiaryTask(ArrayList<DiaryVO> vList, int patientID, boolean online) {
            voList = vList;
            this.patientID = patientID;
        }

        @Override
        protected Integer doInBackground(Void... voids) {
            int cts = 0;
            try {
                // Simulate network access.
                Thread.sleep(500);
            } catch (InterruptedException e) {

            }
            for (DiaryVO vo : voList) {
                String tURL = getString(R.string.api_prefix) + vo.getURLString(patientID);
                try {
                    ResponseVO rVO = Helpers.getDiaryUrlSource(tURL);
                    cts++;
//                    Log.i(getString(R.string.tag_async), rVO.toString());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return cts;
        }

        @Override
        protected void onPostExecute(final Integer ct) {
            //Reset
            mSubmitTask = null;
            showProgress(false);
            //Diary entires sent.
            if (ct >= voList.size()) {
//                showNotice(ct, getString(R.string.items_saved));
                String totalSize = voList.size() +"";
                if (user.getDiaryList() != null){
                    totalSize = user.getDiaryList().size() + voList.size() +"";
                }
                showNotice(1,user.getUserName(),totalSize, voList.get(0).getTitle(),voList.get(0).getNotes() );
                if (user.getDiaryList() == null) {
                    user.setDiaryList(new ArrayList<DiaryVO>());
                    user.getDiaryList().addAll(voList);
                }
                voList.clear();
                Log.i(getString(R.string.tag_debug), "list size:" + diaryVoList.size());
                diaryVoList.clear();
                Toast.makeText(getApplicationContext(), new StringBuilder().append(ct + " ").append(getString(R.string.items_saved)).toString(), Toast.LENGTH_LONG).show();

            }
        }

        @Override
        protected void onCancelled() {
            mSubmitTask = null;
            showProgress(false);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        savePrefs();

    }

    @Override
    protected void onStop() {
        super.onStop();


    }

    /**
     * Set action bar interface
     *
     * @param actionBar
     * @param heading
     */
    public void setActionBar(ActionBar actionBar, String heading) {
        // TODO Auto-generated method stub

//    ActionBar actionBar = getSupportActionBar();
        actionBar.setHomeButtonEnabled(true);
        actionBar.setDisplayHomeAsUpEnabled(false);
        actionBar.setDisplayShowHomeEnabled(false);
        actionBar.setIcon(R.drawable.ml);
//        actionBar.set
//    actionBar.setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.colorPrimaryDark)));
        actionBar.setTitle(heading);
        actionBar.setLogo(R.drawable.ml);


        actionBar.show();

    }

    private void savePrefs() {
        SharedPreferences prf = getPreferences(MODE_PRIVATE);           //saves all symbols of past portfolio
        SharedPreferences.Editor e = prf.edit();
        if (diaryVoList != null && diaryVoList.size() > 0) {
            String json = new GsonBuilder().serializeNulls().create().toJson(diaryVoList);
            e.putString(getString(R.string.lcl_db_data), json);
            e.putBoolean(getString(R.string.lcl_db_hasdata), true);
        } else {
            e.putBoolean(getString(R.string.lcl_db_hasdata), false);
            e.remove(getString(R.string.lcl_db_data));
        }
    }

    //TODO make the sync spin!
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            mFormView.setVisibility(show ? View.GONE : View.VISIBLE);
            mFormView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mFormView.setVisibility(show ? View.GONE : View.VISIBLE);
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
            mFormView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
//        MenuItem item = getToolbar().getMenu().findItem(Menu.FIRST);
//
//        Animation animation = new RotateAnimation(0.0f, 360.0f,
//                Animation.RELATIVE_TO_SELF, 0.5f,
//                Animation.RELATIVE_TO_SELF, 0.5f);
//        animation.setDuration(700);
//        animation.setRepeatCount(Animation.INFINITE);
//
//        ImageView imageView = new ImageView(this);
//        imageView.setImageDrawable(UIHelper.getIcon(this, MMEXIconFont.Icon.mmx_refresh));
//
//        imageView.startAnimation(animation);
//        item.setActionView(imageView);
    }

    /**
     *
     * @param rows
     * @param strings <ol><li>username</li>
     *                <li>num entries
     *                </li>
     *                <li>title</li>
     *                <li>body</li>
     *                </ol>
     */
    private void showNotice(int rows,String... strings){

        NewMessageNotification.notify(getApplicationContext(),strings, rows);
    }
    private void showNotice(int rows, String action) {
        NewMessageNotification.notify(getApplicationContext(), action, rows);
//    notificationManager = NbewMessageNotification.
//            (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//    myNotification = new NotificationCompat.Builder(getApplicationContext());
//    int x = result.split("http").length - 1;
//    myNotification.setContentTitle("Files updated").setContentText(x + " file"+ (x>1?"s":"")+" updated");
//    myNotification.setSmallIcon(R.drawable.ml);
//    Context context = getApplicationContext();
//    //Push to notify activity
//    Intent myIntent = new Intent(context, MyNotificationActivity.class);
//    myIntent.putExtra(Helpers.IPARAM_NOTIFY_MSG, result.replace("http", "\r\nhttp") + "\r\n\r\nChecking every : " + intervalMin + " minute" + (intervalMin > 1 ? "s.":"."));
//    PendingIntent pendingIntent
//            = PendingIntent.getActivity(getBaseContext(),
//            0, myIntent,
//            PendingIntent.FLAG_UPDATE_CURRENT);
//    myNotification.setContentIntent(pendingIntent);
//    notificationManager.notify(MY_NOTIFICATION_ID, myNotification.build());
    }

}