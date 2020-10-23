echo $SSH_KEY > id_rsa
chmod 600 id_rsa
scp -i id_rsa -P $SSH_PORT -qr ./dist "$SSH_DOMAIN:~"
ssh -i id_rsa -p $SSH_PORT $SSH_DOMAIN -t $SSH_POST_CMD
rm id_rsa
