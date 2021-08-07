#!/bin/bash
# Black        0;30     Dark Gray     1;30
# Red          0;31     Light Red     1;31
# Green        0;32     Light Green   1;32
# Brown/Orange 0;33     Yellow        1;33
# Blue         0;34     Light Blue    1;34
# Purple       0;35     Light Purple  1;35
# Cyan         0;36     Light Cyan    1;36
# Light Gray   0;37     White         1;37
#echo -e "\e[1;32m Enter commit message: \e[0m";
COLOR='\033[1;33m';
git s;
printf "${COLOR}Enter commit message:\n";
read description_commit;
npm run jest --noStackTrace --silent --passWithNoTests   --runInBand --colors;
printf "${COLOR}lint:fix\n";
npm run lint:fix;


if [ $? -eq 0 ];
then
    printf "${COLOR}git add --all\n";
    git add .;
    printf "${COLOR}git commit\n";
    git commit -m "${description_commit}";
fi
