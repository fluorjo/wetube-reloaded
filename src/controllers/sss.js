if('access_token' in tokenRequest){
    const apiUrl = "https://api.github.com/";
    const userData = await(
        await fetch(`${apiUrl}/user`,{
        headers:{
            Authorization:`token ${access_token}`,
        },
    })
    ).json();

    console.log('user data:',userData);

    const emailData = await(
        await fetch(`${apiUrl}/user/emails`,{
        headers:{
            Authorization:`token ${access_token}`,
        },
    })
    ).json();
    
    console.log('email data',emailData);
    console.log(finalUrl);

}else{
    return res.redirect('/login');
};
};