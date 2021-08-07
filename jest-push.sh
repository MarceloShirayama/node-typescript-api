npm run test:ci

if [ $? -eq 0 ];
then
    git push -u origin main;
fi
