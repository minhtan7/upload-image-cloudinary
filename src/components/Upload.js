import { useState, useCallback } from 'react';
import { Buffer } from 'buffer';
import { decode as atob, encode as btoa } from 'base-64'

// @mui
import { styled } from '@mui/material/styles';
import {
    Box,
    Card,
    Stack,
    Switch,
    Container,
    CardHeader,
    Typography,
    CardContent,
    FormControlLabel,
} from '@mui/material';

import Page from './Page';
import UploadAvatar from './UploadAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(11),
    paddingBottom: theme.spacing(15),
}));

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/tanvo/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'panther';

export default function Upload() {

    const [avatarUrl, setAvatarUrl] = useState(null);
    //------------ upload file
    //https://api.cloudinary.com/v1_1/{{cloud_name}}/:resource_type/upload
    const uploadImg = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            const res = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            setAvatarUrl(data.url)

            // if (data.secure_url !== '') {
            //     const uploadedFileUrl = data.secure_url;
            //     localStorage.setItem('passportUrl', uploadedFileUrl);
            // }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDropAvatar = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            uploadImg(file)
        }

    }, []);
    console.log("avatar", avatarUrl)
    return (
        <Page title="Components: Upload">
            <RootStyle>
                <Container>
                    <Stack spacing={5}>
                        <Card>
                            <CardHeader title="Upload Avatar" />
                            <CardContent>
                                <UploadAvatar
                                    accept="image/*"
                                    file={avatarUrl}
                                    onDrop={handleDropAvatar}
                                    helperText={
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary',
                                            }}
                                        >
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                        </Typography>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </RootStyle>
        </Page>
    );
}
