---
title: The KLCP Experience (PEN-103)
summary: My thoughts on the Kali Linux Certified Professional certification by OffSec
date: 2026-02-16
tags: [Certification]
---

The KLCP certification is one that I wouldn’t typically pursue since it is less recognised in the industry however as part of my Offsec subscription, I had 1 x KLCP Exam attempt included so I thought that it would be a good change of pace from OSCP study for week.

KLCP is an 80 multiple choice question exam that covers topics like creating Live ISOs, Debian package management, configuring services and a little bit on security assessments…?

Overall, the course wasn’t anything like what I expected going in mainly due to 2 main factors.

The course had a lot of stuff that wasn’t ‘Kali Linux’. 

Before commencing the course, I expected it to be a relatively easy certification covering stuff that is *unique* to Kali itself, however, the majority of the course was about very general Linux (specifically Debian) content, covering stuff like linux commands, managing processes, users and groups, networking, compiling the linux kernel and managing machines in an enterprise environment. The Kali specific content included the history of Kali, features of Kali, applying patches (general Debian but still relevant I would say), customising Kali Live ISO and adding persistence to live ISO.

Generally, I thought that the Kali specific content was decent and more of what I was expecting (besides Kali history being assessable content ;-;). The remainder of the course felt slightly irrelevant and oddly specific at times. For example, within configuring services, we learn how to setup SSH, Postgresql and Apache. Personally, I haven’t had to setup an apache server for any CTF or work as there are other, faster ways to transfer files if that is the aim. I can also confidently say that I have already forgotten most of postgresql’s setup steps since the exam which leads me to my next point.

There is a large emphasis on memorisation of content that typically would (and probably should) get googled.

I should preface this by giving context on the exam which consists of questions regarding anything and everything taught in the 181 hour course (per Offsec). The sample questions available on the Wayback Machine at [https://web.archive.org/web/20210803003815/https://kali.training/downloads/klcp-quiz.pdf](https://web.archive.org/web/20210803003815/https://kali.training/downloads/klcp-quiz.pdf)

gives a semi-decent indication of the type of questions that get asked. Some questions are decent, however others are just out to trick you. 

For example, chapter 5 question 13:

Which command will create a postgres database name db_new?

- createdb -T template0 -E UTF-8 -n db_new
- createdb -T template0 -E UTF-8 -O dbuser db_new
- psql -h localhost -c db_new -O dbuser dbuser
- pg_create -o dbuser -n db_new -E UTF-8

Each of these commands has fairly similar syntax and you might be able to narrow it down to the first 2 options. The ‘-n’ flag seems reasonable? It probably stands for “name”. The ‘-n’ flag does not actually exist in the **creatdb** command and the answer is option 2.

I don’t think that someones pass/fail in this cert should depend on their knowledge of a particular flag for database creation in postgres. This is one of many examples (even in the real exam) where such questions occurred frequently, testing very niche, easily googleable knowledge and providing very similar and easily confuseable options that will likely not ever be used by the majority of people wanting to get into penetration testing.

With this being said, if I had to do this test again, there is 1 resource which I would have utilised earlier than the few hours before the exam:

[https://quizlet.com/764413848/klcp-flash-cards/](https://quizlet.com/764413848/klcp-flash-cards/)

These flash cards cover pretty much every term in the KLCP course and directly helps with the type of questions asked in the exam and help memorise flags for commands and definitions for concepts.

Personally, my preparation involved making basic notes for all the course content and then going over these flashcards in the hours before the exam in rapid fire. I can directly attribute me knowing the answers to some questions based on what I learnt in those few hours.

![KLCP Certification picture](/images/KLCP_Certification.png)