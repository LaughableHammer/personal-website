---
title: 2025 NSW Gov CTF Writeup
summary: My solutions and notes from the 2025 NSW Government CTF. It was an 8 hour CTF and our team placed 13/155.
date: 2025-11-23
tags: [CTF Writeup]
---

# Intro

## Your first flag - Solved

Your First Flag and maybe even at your first CTF!!

You'll find that the challenges will require proof that you solved it, which is called a "flag". Sometimes a challenge will ask you to wrap the answer in flag{...}, though in all cases the challenge description will tell you what to do. Good luck and have fun!

Can you copy and paste this flag?

flag{1_can_c0py_and_past3}

flag: flag{1_can_c0py_and_past3}

Comments: One of the harder challenges in the CTF

## Flag Hunting - Solved

There's a flag here somewhere...where would I look?

The flag will be obvious once you've found it!

Comments:

Navigating to /robots.txt on the ctfd site shows 2 endpoints

![image.png](/images/nsw-gov-ctf-2025/image.png)

/admin is likely the actual admin portal

/superadmin takes you straight to the flag

![image.png](/images/nsw-gov-ctf-2025/image%201.png)

flag: flag{sup3r_adm1n_1s_sup3r_dup3r}

## Funny Looking Code - Solved by team

I've found some funny looking code when unpacking some malware, what could it mean?

ZmxhZ3thMTFfeTB1X2JhczNfYXIzX2JlbDBuZ190MF91c30=

Comments:

The combination of uppercase and lowercase characters and numbers + the equal sign padding at the end indicate that its a base64 encoded string

![image.png](/images/nsw-gov-ctf-2025/image%202.png)

flag: flag{a11_y0u_bas3_ar3_bel0ng_t0_us}

## Welcome to Discord! - Solved by team

There's a flag hidden somewhere on the Discord server, can you find it?

## Elf on the /shelf - Solved

Can you run this simple program?

Provided file: runme.elf

Comments:

Running the `file` command on the binary shows that it is an x86 64 bit binary

![image.png](/images/nsw-gov-ctf-2025/image%203.png)

To get the flag, we just need to make it executable with `chmod +x runme.elf` and then we can run it with `./runme.elf`.

![image.png](/images/nsw-gov-ctf-2025/image%204.png)

flag: flag{n1c3_w0rk_runn1ng_th1s}

## My Strong Password - Solved by team

So I have to have at least three of the following to make a strong password?: An uppercase, lowercase, numbers and special characters.

Well, here's the md5 of my strong password, it'll be hacker proof!!

2c103f2c4ed1e59c0b4e2e01821770fa

Comments:

The fastest way to crack hashes of insecure passwords is to use crackstation.net

![image.png](/images/nsw-gov-ctf-2025/image%205.png)

flag: flag{Password123!}

## Salad - Solved by team

We caught this string of characters being sent out to a Command and Control (C2) server. It appears to be a very basic cipher. Can you work out what it is?

jxyisxqbbudwucqtucuxkdwho

Comments:

Looks like simple caesar cipher [decode.fr](http://decode.fr) should be able to bruteforce it pretty easily:

![image.png](/images/nsw-gov-ctf-2025/image%206.png)

flag: flag{thischallengemademehungry}

## My Stronger Password - Solved by team

My last password must have been too easy, now you cannot just google it! Did you also notice that this challenge didn't appear until you solved "My Strong Password"? Some challenges have prerequisites!

Can you work out my new password?

02f5acf3c832d546dc5e7110bc65eb7f

Comments:

Again, we can just put it into [crackstation.net](http://crackstation.net) for an easy flag:

![image.png](/images/nsw-gov-ctf-2025/image%207.png)

flag: flag{1234qwerasdfzxcv}

## Where is this? - Solved by team

Open Source Intelligence (OSINT) challenges come in a few flavours. One type of OSINT challenge is trying to work out exactly where a photo was taken.

Can you find this location based on what you see in the photos?

Wrap the latitude and longitude within flag{...}, to the nearest three decimals and without any spaces. For example, flag{-30.123,148.123)

Image attached: 

![whereisthis.jpg](/images/nsw-gov-ctf-2025/whereisthis.jpg)

Comments:

The side of the image says “Flying Pieman”

![image.png](/images/nsw-gov-ctf-2025/image%208.png)

We can find an article on the artwork online and then find the coordinates with google maps.

I had a slight advantage because I’ve seen this artwork in person many times but it shouldn’t take too long to find the exact location.

![image.png](/images/nsw-gov-ctf-2025/image%209.png)

flag: flag{-33.816, 151.005}

## Undoing Powershell Mess - Solved by team

As part of malware analysis, you might need to fix through some wild obfuscation. There's a few reasons why hackers do this: Avoiding detection from the security stack and making it really hard to see what it's doing!

Can you work out where the hacker is exfilling the data? As this is just a CTF challenge and not a live example of malware, don't be afraid to lean on your favourite AI chat to do the heavy lifting!

Wrap the answer in flag{...}, for example flag{\192.168.1.1\exfil}

File: totally_safe_and_please_run_as_admin.ps1.txt

Comments:

![image.png](/images/nsw-gov-ctf-2025/image%2010.png)

Initially, there is a lot happening in this script. All the variable names seem to also be obfuscated to make it more annoying. Rather than taking the time to do this manually, lets take their advice and let Gemini deobfuscate this for us.

Prompt: Deobfuscate this script: <Entire Script>

Answer: 

![image.png](/images/nsw-gov-ctf-2025/image%2011.png)

This makes it very obvious and Gemini even points out that the “remote network share” is `\\10.31.12.203\share`

flag: flag{\\10.31.12.203\share}

## Hideaway - Solved by team

While investigating a breach, we've found a photo that doesn't belong. It seems they're staying at a hotel - what is the name of the hotel where this photo was taken from?

Flag format: flag{Name_Of_Hotel}

File: wherearetheyhiding.png

![wherearetheyhiding.png](/images/nsw-gov-ctf-2025/wherearetheyhiding.png)

Comments:

The hotel across the street is clearly called Warringa Surf

![image.png](/images/nsw-gov-ctf-2025/image%2012.png)

Walking around in street view will confirm this but there is only 1 hotel across the road from Warringa Surf and that is the **Surf Parade Resort**

flag: flag{Surf_Parade_Resort}

## My First Program - Solved by team

You've been asked to statically analyse the attached suspicious file

File: myprogram.exe

Comments:

Running `file` on the program shows that it is indeed an executable file

![image.png](/images/nsw-gov-ctf-2025/image%2013.png)

Since this is an intro challenge, the flag is probably visible in plaintext so the `strings` command will likely be helpful

Ok so strings produced a lot of output:

![image.png](/images/nsw-gov-ctf-2025/image%2014.png)

We can narrow it down by `grep` ing for “flag”

![image.png](/images/nsw-gov-ctf-2025/image%2015.png)

The first result is the flag

flag: flag{4lw4y5_w0r7h_ch3ck1n6_57r1n65_f1r57}

## DoorsRUs - BotsRUs - Solved

Website: [DoorsRUs](https://nswgovctf-doorsrus.chals.io/)**Note:** Brute forcing isn't required.  If you knock on the door too many times it will autolock for 5 minutes.

Bots are taking over everything.  It wouldn't surprise me if they've 
been a part of vibe coding my server!  If only there was some way for me
 to stop them crawling through my stuff.

Find the flag where crawlers should look first before browsing your site.

Comments:

Internet rule-obeying crawlers will first navigate to the `/robots.txt` file which tells them where they can and cannot go.

![image.png](/images/nsw-gov-ctf-2025/image%2016.png)

flag: flag{r0b07s_5037}

# Forensics

## Coded Correspondence - Solved

You are tasked with reviewing this file as part of incident response.

File: FinalSyncMeeting.eml

Comments:

![image.png](/images/nsw-gov-ctf-2025/image%2017.png)

We can open the email in any email client and download the attachment

Then `cat`ing the file gives us the flag

![image.png](/images/nsw-gov-ctf-2025/image%2018.png)

Alternatively, instead of opening the file in an email client, it is also possible to find the base64 encoded ics file and decode it to reconstruct the FinalSyncMeeting.ics attachment.

flag: flag{b45364_3m41l_4774chm3m7}

## Open Sesame - Solved

You are tasked with analysing the attached file. Can you work out what the file is and unlock it?

File: chimera_update.eml

Comments:

Again, we can open the file in an email client for ease

![image.png](/images/nsw-gov-ctf-2025/image%2019.png)

The attachment is a zip file which requires a password to open

![image.png](/images/nsw-gov-ctf-2025/image%2020.png)

My initial thoughts where that the password might be `Nebula` since it was highlighted in the email however this was not the case.

Then, the password must be of the form DDMMYYY since the email says that keep that handy.

I vibe-coded a simple script that can bruteforce the zip file with that format of a password.

```bash
import zipfile
from datetime import date, timedelta

zip_path = "attachment"

def attempt(zip_file, pwd):
    try:
        zip_file.extractall(pwd=pwd.encode())
        print(f"[+] Password found: {pwd}")
        return True
    except:
        print(f"Tried password: {pwd}")
        return False

with zipfile.ZipFile(zip_path) as zf:
    start = date(1000, 1, 1)
    end   = date(2100, 12, 31)

    current = start
    while current <= end:
        pwd = current.strftime("%d%m%Y")
        if attempt(zf, pwd):
            break
        current += timedelta(days=1)
```

*Note that the email said the password was in the format DDMMYYY however that was a typo (maybe intentional from CTF writers, maybe not), so we instead bruteforce for DDMMYYYY.

Running the script, we find the password in about 20 seconds

![image.png](/images/nsw-gov-ctf-2025/image%2021.png)

Then after unzipping the file, a file called “chimera.png” is revealed which shows the flag once opened.

![image.png](/images/nsw-gov-ctf-2025/image%2022.png)

flag: flag{bru73f0rc3_p455w0rd_pr073c73d_3ml_4774chm3n7}

## Hiding in it’s Shell - Solved

Exmaine the attached powershell that's been flagged by the SIEM

Note: it's not acutally malware, but the same concepts apply

File: unknown.ps1

Comments:

A ps1 file is a powershell script so the flag is likely embedded somewhere within that.

If we just `cat` the file, we can see that a “win” variable is defined

![image.png](/images/nsw-gov-ctf-2025/image%2023.png)

It seems to be constructing a string using a combination of decimal ascii + shuffling around strings. Whilst I initially manually constructed the string in the CTF, a much easier way is to just actualy initialise this variable in Kali using the `pwsh` tool which allows you to run powershell in your terminal.

![image.png](/images/nsw-gov-ctf-2025/image%2024.png)

Note that `$win` will print out the value of the “win” variable.

flag: flag{y0u_4r3_p0w3r1n6_7hr0u6h!}

## Shell Shocked - Solved

The SIEM has flagged yet another file (attached) for you to check out

Note: it's not acutally malware, but the same concepts apply

File: unknown.ps1

Comments:

Again, if we cat the contents of the file, the $compact variable stands out to me the most since it contains an obfuscated string.

![image.png](/images/nsw-gov-ctf-2025/image%2025.png)

Looking closer, in that one long line, multiple variables are being defined.

$compact → a long string (probably b64 looking at the padding bytes)

$bytes → takes the value of $compact and b64 decodes it (aha so it was base64 encoded)

$ms → creates a memory stream of the valyes of $bytes (not sure what that means)

$gz → zips the value of $ms

$sr → creates a stream reader using $gz (again, no idea)

$obfuscated → reads the value of $sr (?)

Ok, so we are taking a string, base64 decoding it and then zipping it up. Lets try and reverse the process in [https://gchq.github.io/CyberChef](https://gchq.github.io/CyberChef)

![image.png](/images/nsw-gov-ctf-2025/image%2026.png)

First we base64 decode and then we unzip it (using Gunzip since we know that the program was using gzip to zip up the contents)

The output seems to be the powershell flag, very similar to `Hiding in it's Shell`

![image.png](/images/nsw-gov-ctf-2025/image%2027.png)

Pasting it all and checking the value of the combined variables gives us the flag.

flag: flag{d30bfu5c471n6_0bfu5c473d_p0w3r5h3ll_5cr1p7_a3ed90}

## Can You Read My Packets? 1 - Solved

Can you find the flag in the PCAP file?

For first time users, Wireshark is your friend :)

File: simple_pcap.pcap

Since this is meant to be an easier challenge, I tried to just search for the flag but that didn’t work

![image.png](/images/nsw-gov-ctf-2025/image%2028.png)

So then I spun up wireshark and opened the file

A quick way to check if any files were downloaded or uploaded in the packet capture is to go to:

**File → Export Objects → HTTP**

![image.png](/images/nsw-gov-ctf-2025/image%2029.png)

Here we see quite a few files, downloading them all and going through them, the favicon.png file contains the flag.

![image.png](/images/nsw-gov-ctf-2025/image%2030.png)

flag: flag{you_found_the_flag!}

## Logged - Solved

Uh oh, the Content Management System (CMS) website has been defaced somehow. Someone must have logged in with special privileges and made chages to the web page source code. The Incident Response team has pulled the web logs for a period just before the page was defaced, what's worse is no one had realised the web logs were logging the password hashes.

The flag value for this challenge is the decoded hash of the successful login for the user with special priveleges. For example, if the decoded hash value is "password" the flag to submit would be: flag{password}

File: logged_challenge_file.7z

Comments:

So we are given a zip file, likely with a large amount of logs and we need to find the hash of the password which led to a successful login and then crack it (I’m thinking with [crackstation.net](http://crackstation.net) again)

On linux, we can use `7z x logged_challenge_file.7z` to extract file contents and then I will open it in VS Code for ease and syntax highlighting.

![Snippet of the file](/images/nsw-gov-ctf-2025/image%2031.png)

Snippet of the file

Here, we have the source IP of requests, date and time, the request that was made and the endpoint that it was made to, the return code, payload length (?) and then the user agent.

The lines where the user agent = “Hydra” are likely the attacker using the Hydra bruteforcing tool.

We can see that for most of the attacker’s requests, they received a 401 unauthorised, so we simply need to find the line where they received a 200 result instead indicating that they logged in.

![image.png](/images/nsw-gov-ctf-2025/image%2032.png)

Searching for the likely string, we find it on line 37622.

An alternative method could have been to write a script to extract all the lines that contained “Hydra” and look for any 200 OK response.

```bash
# Define file paths
input_file = "access.log"
output_file = "modified.log"

# The string you're searching for
target = "Hydra"

# Open files
with open(input_file, "r") as infile, open(output_file, "a") as outfile:
    for line in infile:
        if target in line and "401" not in line:
            outfile.write(line)
```

![image.png](/images/nsw-gov-ctf-2025/image%2033.png)

(in retrospect, an even easier way would be to `cat modified.log | grep 200 | grep "Hydra"`)

Then, we just put the hash value into [crackstation.net](http://crackstation.net) to get the password used:

![image.png](/images/nsw-gov-ctf-2025/image%2034.png)

flag: flag{bratinella}

## The Masked Forensicator 1 - Solved

The file attached to this challenge is relevant to all 5 Masked Forensicator challenges.

We've been given some evidence which needs to be examined. But first things first, we need to make sure that it matches the file obtained from the system.

What is the SHA256SUM of the evidence.7z file?

File: evidence.7z

Comments:

To get the sha256 sum on linux: `sha256sum evidence.7z`

flag: flag{a5e7d077a1d440dc4f48ff590367b2f5e4f96016caa08001f44537d84a492269}

## The Masked Forensicator 2 - Solved

The file for this challenge is attached to The Masked Forensicator 1.

This evidence was obtained using a forensic collection tool. What command was run to obtain this evidence?

Remember, a command requires both an executable as well as parameters :)

Enter it in the normal flag{answer} format.

e.g. flag{cmd.exe /c 'powershell.exe -WindowStyle Hidden -File "C:\Path\To\Your\Script.ps1"'}

Comments:

After `7z x`ing the file, the ConsoleLog.txt file shows the commands that were run on the system. A program called kape was used

flag: flag{kape.exe --tsource C: --tdest C:\share\collection --tflush --target !BasicCollection,!SANS_Triage,KapeTriage --zip evidence --gui}

## New Memories 1 - Solved

The file attached to this challenge is relevant to all New Memories challenges.  The password for the 7z file is *ubuntu*

It turns out the attacker from The Masked Forensicator challenges was operating from a VM on our own network!  We were able to take a snapshot and obtain a memory dump before they wiped it from our VM host. However, we're having problems analysing it in the normal way, because it's causing errors in our Volatility tool.  The VM name indicates it's running Ubuntu, but I'm not sure if that's correct.  What name does Volatility say this OS is?

File: Ubuntu.7z

First we need to get volatility.

Download the zip file from releases https://github.com/volatilityfoundation/volatility3/releases/latest

unzip it and then run `python -m venv venv` to create a virtual environment.

`source venv/bin/activate` to activate the virtual environment.

Then download all dependenies with `pip install -e ".[dev]"`

Now you can run volatility with the `vol` command.

Then `7z x Ubuntu.7z` with password **ubuntu** and run the command `vol -f ubuntu-Snapshot1.vmem banners.Banner`

![image.png](/images/nsw-gov-ctf-2025/image%2035.png)

flag: flag{Linux version 6.12.38+kali-amd64 ([devel@kali.org](mailto:devel@kali.org)) (x86_64-linux-gnu-gcc-14 (Debian 14.2.0-19) 14.2.0, GNU ld (GNU Binutils for Debian) 2.44) # SMP PREEMPT_DYNAMIC Kali 6.12.38-1kali1 (2025-08-12)}

## The Masked Forensicator 4 - Solved by team

…

# Misc

## Range Anxiety - Solved by team

## Secret Value Geometry - Solved

Pen or pencil, by hand or computer generated? What's the flag?

File: download

Comments:

Having a look at the file contents, it looks like an SVG path so we just need a way to render it, an easy way is to create a simple HTML file and put it in there:

```html
<!DOCTYPE html>
<html>
    <body>
        <svg width="1000" height="1000" viewBox="0 0 1000 1000">
            <path d="<all the values go here>" />
        </svg>
    </body>
</html>
```

![image.png](/images/nsw-gov-ctf-2025/image%2036.png)

flag: flag{wr171n6_0n_7h3_p47h}

## Old School Spooks - Alice In Wonderland, Chapter 1 - Solved

I was going though my grandfathers David's old books, and found this in their library, my grandfather was always hiding things in small places.
Can you find what they hid?

File: Alice_In_Wonderland.svg

Comments:

SVG files are actually just XML so we can open it in a code editor to have a look at the markup.

![image.png](/images/nsw-gov-ctf-2025/image%2037.png)

The flag is visible at the bottom

flag: flag{th15_m1ght_B3_A_l1ttle_3asY_t0_p4r53}

## Old School Spooks - Alice In Wonderland, Chapter 2 - Solved

In the next chapter of the book, I couldn't see what they wrote, I recall they used to have the tiniest handwriting, hands of a surgeon David had.

File: Alice_In_Wonderland_Chapter_2.svg

Comments:

Opening this file in a code editor shows some text at the bottom which has fill=”none” and stroke=”#FFFFFF” which is white and the width is only 0.1

If we adjust each of these lines to fill=”red” stroke=”#FF0000” stroke-width=”0.3” then it should be very easy to see the red text in the SVG. 

*You can select an area of text and then do CTRL + D in vscode to select other similar strings and edit them all simultaneously.

![image.png](/images/nsw-gov-ctf-2025/image%2038.png)

Once thats done, we can open the SVG to see the flag once we zoom into the red.

![image.png](/images/nsw-gov-ctf-2025/image%2039.png)

![image.png](/images/nsw-gov-ctf-2025/image%2040.png)

flag: flag{y0u_fouNd_M3}

# Reversing

## Decimated - Solved

The SOC has an alert raised on the attached file. Can you work out what it does and find the flag?

File: Unknown

Comments:

First thing we can do is see what the `file` type is.

![image.png](/images/nsw-gov-ctf-2025/image%2041.png)

Perfect, its a 64 bit linux executable file so we can open it in our favourite decompiler.

I use BinaryNinja but a good online tool is [dogbolt.org](http://dogbolt.org) for a browser based version.

![image.png](/images/nsw-gov-ctf-2025/image%2042.png)

Looking at the high level overview, there is a hardcoded ASCII string which gets copied into a variable. Then we print “flag =” followed by a look. 

The loop iterates for each character in the string and prints 0x2a which is “*”.

So we just need to decode the string with a decimal to ascii converter online.

![image.png](/images/nsw-gov-ctf-2025/image%2043.png)

flag: flag{y0u_f0und_m3}

## x or y - Solved

The CEO has received a suspicious email with the attached file as an attachment to the email. Can you find out what it is and what the flag is?

File: unknown

Comments:

Same as before, we have another 64bit executable binary

![image.png](/images/nsw-gov-ctf-2025/image%2044.png)

Opening it in BinaryNinja

![image.png](/images/nsw-gov-ctf-2025/image%2045.png)

Going top down, there is a stack canary, another magic string that gets copied into a variable and then a function call with the value of this variable and thats about all `main` does.

If we follow the function call.

![image.png](/images/nsw-gov-ctf-2025/image%2046.png)

There is a while loop, lets rename some of the variables to make it more friendly to read.

![image.png](/images/nsw-gov-ctf-2025/image%2047.png)

Its going over every value of the magic string and XORing it with an asterisk character. We can do that ourselves to see what we get.

![image.png](/images/nsw-gov-ctf-2025/image%2048.png)

flag: flag{xoring_executable_fun}

# OSINT

## Party Rock - Solved

This scrape of a secret social media service belongs to suspect - seems he's trying to build up his image through fake clout. We think his next set is real though - where's it going to be at?

File: Twottahacker.html

Comments:

This seems to be where his next set is

![image.png](/images/nsw-gov-ctf-2025/image%2049.png)

We can reverse image search it on google to find the location.

![image.png](/images/nsw-gov-ctf-2025/image%2050.png)

The AI overview also seems to be right this time and the place does look like Cordeaux Dam

flag: flag{Cordeaux_Dam}

## Where Were These Packets Captured? - Solved

So, my friend had to pick something up from a storage container, but the thing he wanted wasn't there, so he had to go to Bunnings. Along the way, he saw a brewery that he wanted to check out later (it was closed at the time)... Can you tell me what town/suburb he lives in, the street of the storage, and the name of the brewery?

Flag format: flag{location_street_brewery} e.g. flag{Rockhampton_Church_Wombat}

File: pcap_osint.pcapng

Comments:

![image.png](/images/nsw-gov-ctf-2025/image%2051.png)

Looking at the packet capture in Wireshark, the scenario seems to be that this person is driving around their locality capturing all the networks as they go and we need to locate them.

While SSIDs aren’t very unique since multiple devices can easily have the same SSID in the same proximity, BSSIDs are a bit more unique to each device so we will use that as the basis for our search.

A cool website is [wigle.net](http://wigle.net) (requires sign up) which allows you to find the location of devices based on SSID or BSSID.

![image.png](/images/nsw-gov-ctf-2025/image%2052.png)

We can find the BSSID for CLAASH-CORP like this.

No results were found for this BSSID, lets try CassidyCrew2 instead.

Nope no results.

How about Telstra413B

Nothing.

How about matador.

Nope.

How about odb.

Aha, finally a hit.

![image.png](/images/nsw-gov-ctf-2025/image%2053.png)

Lets find this place on maps and look for a Bunnings a storage warehouse and a brewery in the middle.

![Bunnings and storage](/images/nsw-gov-ctf-2025/image%2054.png)

Bunnings and storage

![image.png](/images/nsw-gov-ctf-2025/image%2055.png)

~~flag: flag{Warragul_Pearse_Bandolier}~~

Not that one, there happens to be another clue though, there is a shop called The Cassidy Crew (like the wifi we picked up)

![image.png](/images/nsw-gov-ctf-2025/image%2056.png)

flag: flag{Warragul_June_Bandolier}

## That Most Magnificent of Culinary Establishments - Solved

I was driving home the other day and stopped at one of those superior restaurants that are available throughout the land...

Can you tell me the location of the restaurant, and the owner of this particular grand establishment.

Flag format: flag{location_owner's_name} e.g. flag{Maroochydore_John_Smith}

File: maccas.pcapng

Comments:

This is very similar to the previous challenge, we simple need to look up the BSSID on [wigle.net](http://wigle.net) 

![image.png](/images/nsw-gov-ctf-2025/image%2057.png)

![image.png](/images/nsw-gov-ctf-2025/image%2058.png)

There is one result at McDonald’s Gundagai.

A quick google search will reveal the owner.

![image.png](/images/nsw-gov-ctf-2025/image%2059.png)

flag: flag{Gundagai_Luke_McDonald}

## Why Fries - Solved

We've been able to trace the attacks coming from this WiFi Access Point, can you find out what the SSID is from the provided BSSID?

C8:03:F5:36:D4:FC

Wrap the SSID within flag{...}, for example: flag{my-wifi-accesspoint}

Comments:

Lets again search for this BSSID on [wigle.net](http://wigle.net) 

![image.png](/images/nsw-gov-ctf-2025/image%2060.png)

There is just 1 result

flag: flag{wc-psq-wifi}

# Web

## Prove You're Human 1 - Solved

Prove that you're human and find the flag!

[Can you?](https://html-preview.github.io/?url=https://gist.githubusercontent.com/Nothing2CHere-CTF/8d41d0dc1e86f6520b22d20ad28922db/raw/8e90d2cb557d381fe26d4e0d39b2aac19d3061c8/index.html)

Comments:

The website seems to present a fake captcha which wants me to run whatever they’ve copied to the clipboard in my Windows Run dialogue.

![image.png](/images/nsw-gov-ctf-2025/image%2061.png)

![image.png](/images/nsw-gov-ctf-2025/image%2062.png)

On inspecting the site contents, we see that its a power shell command looking at the comment and we can just copy the base64 encoded command and examine it with CyberChef.

![image.png](/images/nsw-gov-ctf-2025/image%2063.png)

And we have the flag!

We can simply copy paste the flag (the non printable bytes don’t get copied)

flag: flag{please_don't_tell_me_you_just_blindly_pasted_and_ran_this_in_your_run_dialog_box?!?}

## Prove You're Human 2 - Solved by team

What about this one. Can you prove you're human this time?

https://html-preview.github.io/?url=https://gist.githubusercontent.com/Nothing2CHere-CTF/92fc010ff9cac4ce42e1a8bea318d931/raw/8358f4faff70203fbd597f5c66a5f1227fdef882/index.html

Comments:
Seems to be the same concept as before with a powershell command that we can see by inspecting the code.

![image.png](/images/nsw-gov-ctf-2025/image%2064.png)

![image.png](/images/nsw-gov-ctf-2025/image%2065.png)

![image.png](/images/nsw-gov-ctf-2025/image%2066.png)

The last line seems to reverse the contents that come before, the powershell command is reversed.

![image.png](/images/nsw-gov-ctf-2025/image%2067.png)

I ran the command and powershell and got a new powershell command out once the long string got reversed.

![image.png](/images/nsw-gov-ctf-2025/image%2068.png)

Upon running the new command, I got an error with how a variable was being used and I was unsure, so asking an AI, it told me that the last line was just called Invoke-Expression in a confusing way so I just replaced that part with “iex”.

Comes out, this is a skill issue of using Powershell on Linux and I wasn’t able to trivially fix this. Running the exact command on an online powershell runners seems to work fine

![image.png](/images/nsw-gov-ctf-2025/image%2069.png)

However once it executes, it doesn’t print out the argument values as it would if I ran it on an actual command line like my teammate did.

Since I’m not bothered to switch to my Windows, I appended the “Get-Variable” command at the end to print all the variables as well and then we can piece them together.

![image.png](/images/nsw-gov-ctf-2025/image%2070.png)

flag: flag{did_you_enjoy_deobfuscating_that?_I_know_you_did!}

## DoorsRUs - Admin Door Lock - Solved

Website: [DoorsRUs](https://nswgovctf-doorsrus.chals.io/)

The door to Admin is locked.  I wonder if there's anything to eat in there.  Get in and get a flag.

Comments:

Navigating to /admin shows this

![image.png](/images/nsw-gov-ctf-2025/image%2071.png)

This seems to be a hint to modify our cookies, so my assumption is that the site incorrectly stores admin status as a cookie, so I just need to register an account, login and modify that value.

![image.png](/images/nsw-gov-ctf-2025/image%2072.png)

Changing is_admin to “true” gives us admin access.

![image.png](/images/nsw-gov-ctf-2025/image%2073.png)

flag: flag{adm1n_c00k13_t4mp3r}

## DoorsRUs - Hidden Doors - Solved

Website: [DoorsRUs](https://nswgovctf-doorsrus.chals.io/)

**Note:** Brute forcing isn't required.  If you knock on the door too many times it will autolock for 5 minutes.

Three doors isn't many for a door shop.  I bet they have more around here somewhere.

Comments:

Lets go look at the doors.

![image.png](/images/nsw-gov-ctf-2025/image%2074.png)

![image.png](/images/nsw-gov-ctf-2025/image%2075.png)

The 3 doors are door 2, 3 and 4, obviously 1 is missing so if we change the url parameter to door=1, we should hopefully see something interesting.

![image.png](/images/nsw-gov-ctf-2025/image%2076.png)

flag: flag{0p3n_s3sam3_d00r_1_IDOR}

## DoorsRUs - ORdoors - Solved

Website: [DoorsRUs](https://nswgovctf-doorsrus.chals.io/)

**Note:** Brute forcing isn't required.  If you knock on the door too many times it will autolock for 5 minutes.

I bet there's some juicy info in these orders.

Comments:

Since this is a web challenge, the challenge title seems like a reference to SQL injection with a classic “OR 1=1;” exploit to get past some barrier.

We will go to the /orders endpoint based on the challenge description and give a simple sqli payload `1' OR 1=1;-- -`

*Note the `-- -` at the end is to comment out any other logic in the SQL query, a postgresql datase uses a `#` for comments instead.

![image.png](/images/nsw-gov-ctf-2025/image%2077.png)

flag: flag{0rd3r_1nj3c710n_d00rs}

## DoorsRUs - Doorway to File System - Solved

Website: [DoorsRUs](https://nswgovctf-doorsrus.chals.io/)

**Note:** Brute forcing isn't required.  If you knock on the door too many times it will autolock for 5 minutes.

I heard a rumor there's a flag.txt file in the root of this server.  If only there was a way to get to it.

Comments:

The name and description immediately imply a local file inclusion vulnerability.

Navigating to the files directory from the home page shows a very promising start:

![image.png](/images/nsw-gov-ctf-2025/image%2078.png)

![image.png](/images/nsw-gov-ctf-2025/image%2079.png)

Opening one of the files shows that the address of the file is a URL parameter so lets try and get the flag in the root directory by going back a bunch of times:

`../../../../../../../flag.txt`

![image.png](/images/nsw-gov-ctf-2025/image%2080.png)

flag: flag{d1r3c70ry_tr4v3rs4l_0n_th3_d00r5}

## Prove You're Human 3 - Solved by team

Can you prove you're human and find the flag this time?

Note: the link above is meant to be hidden (see preview).  Please remove this line when finished QAing

Comments:

There isn’t a link provided this time but looking at the comment, it references a “link above” so I checked with box with inspect and there happened to be a link there.

![image.png](/images/nsw-gov-ctf-2025/image%2081.png)

[https://html-preview.github.io/?url=https://gist.githubusercontent.com/Nothing2CHere-CTF/19d0348fb8470951ea6d2ee85503acad/raw/5fe0b25430a43db693b6d33b77dbbfcad7e76e0b/index.html](https://html-preview.github.io/?url=https://gist.githubusercontent.com/Nothing2CHere-CTF/19d0348fb8470951ea6d2ee85503acad/raw/5fe0b25430a43db693b6d33b77dbbfcad7e76e0b/index.html)

When we go here, we can once again get the base64 encoded powershell command and decode it.

![image.png](/images/nsw-gov-ctf-2025/image%2082.png)

It’s downloading the contents from a website and then running it.

![image.png](/images/nsw-gov-ctf-2025/image%2083.png)

When we navigate to it, there is another powershell script with another link at the top, lets go there now.

Here, we are greeted with a wall of text, shall we assume its base64 and go from there?

![image.png](/images/nsw-gov-ctf-2025/image%2084.png)

And we find the flag part 1 of 4 of the flag after running Strings.

![image.png](/images/nsw-gov-ctf-2025/image%2085.png)

At the top, we see another encoded string after also adding the decode modifier.

After decoding this one, we get the 4th part of the flag.

![image.png](/images/nsw-gov-ctf-2025/image%2086.png)

When I was looking at the initial decoded output, I also found part 2 of the flag:

![image.png](/images/nsw-gov-ctf-2025/image%2087.png)

![image.png](/images/nsw-gov-ctf-2025/image%2088.png)

After cycling through different decodings, it happened to be UTF-16BE and comes out both part 2 and 3 are here!

flag: flag{wow_PS_decoding_AND_rev_to_get_the_flag!_that's_a_bit_much_for_a_one_day_ctf_isn't_it?_good_thing_nothing2chere_doesn't_know_anything_about_coding_or_this_might_have_been_tough!}

## Techshop - Solved by team

Welcome to our new TechShop.

Stay a while and buy some tech gear for hax!

[https://nswgovctf-techshop.chals.io/](https://)

Comments:

https://nswgovctf-techshop.chals.io/feedback/help

This endpoint shows that we can run many bash native commands.

Comes out, I was overcomplicating the challenge and the there was command injection in the Check Inventory field:

![image.png](/images/nsw-gov-ctf-2025/image%2089.png)

flag: FLAG{w3b_sh0p_cmd_1nj3ct10n_0bfu5c4t3d} 

# Cryptography

## Lay3rs to Rockyou - Solved by team /turn

We have a possible Insider Threat who is encrypting their work files. We've be tasked by an investigator to find out what's happening. Can you break through these layers?

File: private.zip

Comments:

On my initial attempt of this challenge, I tried to use fcrackzip to find the password of the zip file however that doesn’t work and I was later told by my teammate that zip2john works.

First, we use zip2john to get the hash that we want to crack to get the password of the zip.

![image.png](/images/nsw-gov-ctf-2025/image%2090.png)

Save that value into a file.

![image.png](/images/nsw-gov-ctf-2025/image%2091.png)

![image.png](/images/nsw-gov-ctf-2025/image%2092.png)

The password for the zip was “theplague”

I was able to use 7zip to extract the file:

![image.png](/images/nsw-gov-ctf-2025/image%2093.png)

![image.png](/images/nsw-gov-ctf-2025/image%2094.png)

The file that popped out was also encrypted so now we use office2john and crack the password of this similarly.

![image.png](/images/nsw-gov-ctf-2025/image%2095.png)

![image.png](/images/nsw-gov-ctf-2025/image%2096.png)

password: acidburnz

Once we open the docx with libre office.

![image.png](/images/nsw-gov-ctf-2025/image%2097.png)

We can just dump this final hash into [crackstation.net](http://crackstation.net) 

![image.png](/images/nsw-gov-ctf-2025/image%2098.png)

flag: flag{zerocool2311}

## A Fine Cipher - Solved by team

This Cipher is fine AF

fjgk{p3W_Q1Dp3N_W0CN3_s0_GFF1t3}

Comments:

![image.png](/images/nsw-gov-ctf-2025/image%2099.png)

Initially it looks like a caesar cipher but it turns out that isn’t the case.

We can do this manually for the first 4 characters since we know that they are “flag”.

The f is offset by 0 characters. The L is offset by 2. The a is offset by 20. The g is offset by 22.

Since there are also numbers in this cipher, a simple ROT seems unlikely.

Since I had very little clue on how to solve this, I was able to give it to ChatGPT and it found that an Affine Cipher was used (ah the description makes sense now).

![image.png](/images/nsw-gov-ctf-2025/image%20100.png)

flag: flag{h3Y_C1Ph3R_Y0UR3_s0_AFF1n3}

## ROT-i - Solved post-CTF

Yes we had ROT-13, but what about the other 24 available keys?

`Tig Gjgzma Nucvth otm ektdnugg hrvan ea 2000 ryvnp aegqui zom 
ptdfh cvfmcjjp nf vki Slfrmlz gpbrv, jd... zqx bgubnn m 
taqx{1g_dRlfRZ_4_R04Z_PW4T5}`

Comments:

To solve this, we need to realise this isn’t a simple ROT cipher but the keys is actually changing per character. We know that in the last phrase, the first 4 letters must be “flag”.

f → t = 14

l → a = 15

a → q = 16

g → x = 17

Simple solve script:

```python
input_string = input("What is the input string? ")

input_string = input_string.lower()
i = 0
for char in input_string:
    if 'a' <= char <= 'z':
        char_val = ord(char)
        char_val -= ord('a')
        
        char_val += i 
        char_val %= 26 
        
        char_val += ord('a')
        
        print(chr(char_val), end='')
        
    else:
        print(char, end='')
    i -= 1
```

![image.png](/images/nsw-gov-ctf-2025/image%20101.png)

flag: flag{1m_hungry_4_m04r_fl4g5}

## 😉🙂🥲 - Solved post-CTF

A dropper was found in a temp directory, disguised as a harmless image the hackers handle seems to be **ByteMac**. Inside it are a bunch of emojis and some text saying:
"I left you a message, but not in your language. Decode the emojis if you dare. **ByteMac**"

😸🙅👺👥👸👵😯😯😷👯👸👳👏👶😵🙋🙅👣👷🙅🙎👱👢👹😰🙇👫👐😶👐🙂👐🙇👴👱👚👘👤👤👘👴👫👩🙈👷👫👘👏👐👲😶👴👵👰

Comments:

To solve this challenge, we just needed to find a website that offers message encoding with emojies.

The relevant one was this one [https://txtmoji.com/](https://txtmoji.com/) with google search prompt “emoji cipher”

![image.png](/images/nsw-gov-ctf-2025/image%20102.png)

The password was “bytemac”

flag: flag{Wink_Sm1leyF4ce_Crying}

## XOR-i? - Solved post-CTF

An XOR Cipher has the potential to be an unbreakable code, as long as the key used for encryption is as long as the message, if your key is too short, it needs to be repeated, and you can use statistical analysis to work out the original key.

Good thing my key is as long as the message and doesn't have that issue!

`66 6d 63 64 7f 34 4b 58 44 38 41 6e 53 4c 60 50 48 7e 40 4c 73 74 42 24 47 28 45 77 75 69 2d 6d 41 6d 4e 7a 7b 46 47 69 7c 76 4f 7d 1f 63 53`

Comments:

After bashing my head against a wall for a while, I realised that this challenge is a continuation of ROT-i and is called XOR-i so lets apply the same concept.

![image.png](/images/nsw-gov-ctf-2025/image%20103.png)

Testing my theory in python, the key does in fact seem to be incrementing numbers.

I coded a quick script to decode this:

```python
string = input("What is the input value: ")

string = string.split(' ')

arr = []
for val in string:
    arr.append(int(val, 16))

i = 0
for val in arr:
    print(chr(val^i), end='')
    i += 1

```

![image.png](/images/nsw-gov-ctf-2025/image%20104.png)

flag: flag{1M_L1Ke_An_XoR_gaT3_1_lit3raLlY_caNT_eV3N}

# boot2root

## boot2root 1

Head over to TryHackMe for these challanges.

[https://tryhackme.com/jr/corpinternal](https://)

To access the server please use the OpenVPN client from [https://tryhackme.com/access](https://)

Challenge:

How many TCP ports are open on this server?

Example:  flag{xxxx}

## boot2root 2

Head over to TryHackMe for these challanges.

[https://tryhackme.com/jr/corpinternal](https://)

To access the server please use the OpenVPN client from [https://tryhackme.com/access](https://)

Challenge:

One of our users left his username on a post it note, I wonder what I can do with this?

![mhenry.png](https://nswgovctf.ctfd.io/files/bf3cbb5418eebe91f8bb09dc2f4ebf52/mhenry.png)

Example:  flag{xxxx_xxxx_xxxx_xxxx}

Author: sussone
QA: Nothing2CHere
