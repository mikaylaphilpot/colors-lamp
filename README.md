# A Summary of the COLORS Application
The COLORS application is a simple web app that allows you to log in using account details from a pre-existing user, add colors, and search for colors.

# Technologies Used
This application uses the LAMP stack. In other words, it uses Linux, Apache, MySQL, and PHP. It is hosted remotely on a LAMP droplet.

# High-level Setup Instructions
1. Obtain a LAMP droplet that runs on Ubuntu 20.04. I recommend going to https://marketplace.digitalocean.com/apps/lamp to purchase one.
2. Purchase a domain if you do not already have one available to use. You can do so on websites like GoDaddy.
4. Once you have done so, go to the Manage DNS section of the settings on the site you bought your domain on. 
Add a record of Type A that points to the IP address of the droplet you purchased. Delete all other records present in this section.
5. SSH into your newly acquired droplet using the IP address. You can do this by typing "ssh root@IPAddressOrDomain" into your terminal. The quotation marks should not be present and the IPAddressOrDomain placeholder should be replaced by your actual IP address or domain, respectively. 
6. Navigate to the directory /root/var/www/html/ by using the command cd. I typically do cd /root/ and then cd /var/www/html/
7. Copy all of the files present on this Github into your LAMP droplet. If you're on mac, you can do the following command to achieve this: 
cd /Users/[yourUserName]/[Your file path to your downloaded copy of this repo] 
ex: /Users/JohnDoe/Downloads

scp -r colors-lamp/

If you are not on a macbook, I recommend downloading FileZilla so you can drag your files between the droplet and your computer. Otherwise you can use the following command: 

put "C:\ [Your file path to your downloaded copy of this repo]"

However this will only allow you to manually transfer one file at a time and you will have to create the directories on the droplet itself using the mkdir command.

8. After you finish transferring all of the files over to the droplet, SSH back into the droplet if needed and ensure they are stored in the correct directories. If not, move them as needed using the mv command.

9. Run the command mysql -u root -p on your droplet and then enter your mysql password.

10. Create a database in mysql and then enter it by entering the following commands.

    create database COP4331;
    use COP4331;

11. Create the Colors table and Users table within your database by entering the following commands.

    CREATE TABLE `COP4331`.`Users` ( `ID` INT NOT NULL AUTO_INCREMENT , `FirstName`
    VARCHAR(50) NOT NULL DEFAULT '' , `LastName` VARCHAR(50) NOT NULL DEFAULT '' , `Login`
    VARCHAR(50) NOT NULL DEFAULT '' , `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`ID`)) ENGINE = InnoDB;

    CREATE TABLE `COP4331`.`Colors` ( `ID` INT NOT NULL AUTO_INCREMENT , `Name`
    VARCHAR(50) NOT NULL DEFAULT '' , `UserID` INT NOT NULL DEFAULT '0' , PRIMARY KEY
    (`ID`)) ENGINE = InnoDB;

12. Populate the working data rows for the Users and Colors tables. You can populate them using whatever users and values you like for this step. Just make sure the UserId values you use when populating the Colors table actually exist. I have attached some examples below. 

    insert into Users (FirstName,LastName,Login,Password) VALUES
    ('Aashish','Yadavally','AYadavally','COP4331');

    insert into Users (FirstName,LastName,Login,Password) VALUES ('Sam','Hill','SamH','Test');

    insert into Colors (Name,UserID) VALUES ('Blue',1);
    insert into Colors (Name,UserID) VALUES ('Blue',2);

13. You can test to ensure your values inserted correctly with the following commands:
    select * from Users;
    select * from Colors;
    select * from Colors where UserID=1;
    select * from Colors where UserID=3;

14. Now create a user and grant that user permissions on the database. If you make a different user than the example listed below, change your files accordingly.

    Use COP4331;
    create user 'TheBeast' identified by 'WeLoveCOP4331'
    grant all privileges on COP4331.* to 'TheBeast'@'%'

# How To Run And Access the Application
Ensure these files are uploaded to the /var/www/html/ directory of your LAMP droplet, then go to to the domain or IP address associated with your droplet in your browser. It should already be running if set up correctly, and ready to use.

# Assumptions
I assumed the reader has some familiarity with basic Linux commands.