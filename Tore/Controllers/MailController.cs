using System;
using System.Net;
using System.Net.Mail;
using Tore.Models;
using Microsoft.AspNetCore.Mvc;


namespace Tore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        [HttpPost("SendMail")]
        public void SendMail([FromBody] Email email, string from = null, string PathToFile = null)
        {        
            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("chaya1724@gmail.com");
            msg.To.Add(email.Address);
            msg.Subject = email.Subject;
            msg.Body = email.Body;
            if (PathToFile != null)
            {
                try
                {
                    Attachment attach;
                    attach = new Attachment(PathToFile, "application/pdf");
                    msg.Attachments.Add(attach);
                }
                catch (Exception e)
                {

                    throw e;
                }

            }
            try
            {
                using (SmtpClient client = new SmtpClient())
                {
                    client.EnableSsl = true;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential("chaya1724@gmail.com", "025001724tnt");
                    client.Host = "smtp.gmail.com";
                    client.Port = 587;
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    client.TargetName = "STARTTLS/smtp.gmail.com";


                    client.Send(msg);
                }
                if (PathToFile != null)
                {
                    msg.Attachments.Dispose();

                }
            }
            catch (Exception e)
            {
                throw e;

            }
        }

        //public IHttpActionResult SendEmailCommit([FromUri] string email)
        //{
        //    try
        //    {
        //        ////פרטים שאת רוצה...
        //        var fromAddress = new MailAddress("youremail@gmail.com", "Name");
        //        var toAddress = new MailAddress(email, "To User");
        //        const string fromPassword = "yourpassword";
        //        const string subject = "MyProject - הרשמה";
        //        const string body = "ההרשמה למערכת נקלטה בהצלחה! כעת הכניסה לאיזור האישי תתאפשר אוטומטית באמצעות ת.ז וסיסמא";
        //        ////
        //        var smtp = new SmtpClient
        //        {
        //            Host = "smtp.gmail.com",
        //            Port = 587,
        //            EnableSsl = true,
        //            DeliveryMethod = SmtpDeliveryMethod.Network,
        //            UseDefaultCredentials = false,
        //            Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        //        };
        //        using (var message = new MailMessage(fromAddress, toAddress)
        //        {
        //            Subject = subject,
        //            Body = body
        //        })
        //        {
        //            smtp.Send(message);
        //        }
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest();
        //    }

        //}
    }
    }