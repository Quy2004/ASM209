import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import UploadCoudiary from "./utils/Cloudiary";

interface ProfileDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string, email: string, phone: string, avatarUrl: string | null) => void;
    user: { name: string; email: string; phone: string; avatar: string };
}

const ProfileDialog: React.FC<ProfileDialogProps> = ({ open, onClose, onSave, user }) => {
    const [name, setName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);
    const [phone, setPhone] = useState<string>(user.phone); 
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar);
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = await UploadCoudiary(file);
            setAvatar(file);
            setAvatarUrl(url);
        }
    };

    const handleSave = () => {
        // Convert phone back to number before saving
        onSave(name, email, phone, avatarUrl);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update Your Profile here.
                </DialogContentText>
                <form noValidate autoComplete="off">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ marginTop: '16px', width: '100%' }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileDialog;
