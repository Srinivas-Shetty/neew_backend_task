var nodemailer = require('nodemailer');


function otpNDigit(otpLength){
    let otp = '';
        for (let i = 0; i < otpLength; i++) {
            otp += Math.floor(Math.random() * 10); 
        }
        return otp;
}
let otp=otpNDigit(6);

/
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Email</title>
    <style>
        /* Base styles for mobile-first design */
        body, table {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        img {
            border: 0;
            display: block;
            outline: none;
            text-decoration: none;
            max-width: 100%;
            height: auto;
        }
        .container {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
        }
        .social-icons img {
            width: 30px;
            height: 30px;
        }
        .content {
            background-color: #eceff7;
            margin: 0;
            padding: 20px;
        }
        .inner-content {
            background-color: white;
            margin: 20px;
            padding: 10px 30px;
        }
        .otp-card {
            background-color: #eceff7;
            color: blue;
            font-size: 35px;
            font-weight: 700;
            text-align: center;
            padding: 30px 0;
        }
        .footer {
            padding: 20px 0;
            text-align: center;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .inner-content {
                padding: 10px 15px;
            }
            .otp-card {
                font-size: 28px;
                padding: 20px 0;
            }
            .social-icons {
                display: flex;
                justify-content: center;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="content">
        <table class="container" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="padding: 10px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td align="left" style="width: 70px;">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQolS4VlcX3usdQuG4P78ITvFR3mfVvB48C0g&s" alt="logo" style="width: 70px; height: 70px; border-radius: 50%;">
                            </td>
                            <td align="right" class="social-icons">
                                <a href="#"><img src="https://ci3.googleusercontent.com/meips/ADKq_NZQ5f9YvhAL1WKj4Wsu4L1lnlGZ8Q7DaFF-HA99TvCUDPV092Nf89VLfNygz0IQzJD2MDLEHdTtv_PJm9ojOEie59r_tlv_vxdbmykkpl7-gk7ipQSm91KvJSPeM9iaTmI=s0-d-e1-ft#https://cdn.cutshort.io/public/images/social-media-icons/email_linkedin.png" alt=""></a>
                                <a href="#"><img src="https://ci3.googleusercontent.com/meips/ADKq_NaSOtUV5ttC-4icXD5aLOVBf3EYBm90oEqemOcW8Lwf9MpWbn3-GODhK5qCPX-fFCzzsf8poAXFr0-B3804rHVEY47VxDjTK47MIT9qrR5rzrAkSdvwkVjTN9I1rkk68Q=s0-d-e1-ft#https://cdn.cutshort.io/public/images/social-media-icons/email_twitter.png" alt=""></a>
                                <a href="#"><img src="https://ci3.googleusercontent.com/meips/ADKq_NY57ge-8_4KyAJ4LaM7sXNii1CrKT-KI_SR_Av4K1xJonCfCXpCwTZXvS69xe6vi1L8ziQVqXoR4vPGM5tdgkzHSFFAr9803Dk8_Ka_fWGzr0flOpEwuNEZ2sNAmMez0SeM=s0-d-e1-ft#https://cdn.cutshort.io/public/images/social-media-icons/email_instagram.png" alt=""></a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <div class="inner-content">
            <h3>Confirm One-Time Password</h3>
            <p>Hi, User</p>
            <p>Please enter the following code on the page where you sent this OTP:</p>
            <div class="otp-card">
                ${otp}
            </div>
            <p>This OTP will only be valid for the next 10 minutes.</p>
        </div>

        <div class="footer">
            <p>Questions or help? <a href="mailto:srinivasyr2000@gmail.com">Email Us</a></p>
            <p>TMS ©2024 Implemented By ITTSTAR.COM</p>
        </div>
    </div>
</body>
</html>
`;


module.exports={
    otpSendForMail:async (req,res,next)=>{

            

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'yrs24052000@gmail.com',
                  pass: 'miol nexo wbnl fxgp'
                }
              });

            var mailOptions = {
                from: 'yrs24052000@gmail.com',
                to: `${req.body.email}`,
                subject: "Here's your OTP to verify your email address",
                // text: `${otp} this will expire after 5 mins`,
                html:html
            };

            transporter.sendMail(mailOptions, await function(error, info){
                if (error) {
                  console.log("Error from node Mailer"+error);
                } 
                  console.log('Email sent: ' + info.response);
                  req.otp=otp;
                  next();
              });
    }
}
