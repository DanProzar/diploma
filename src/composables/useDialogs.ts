
export const useDialogs = () => useState('auth-dialogs', () => ({
  welcome: false,
  auth: false,
  reset_password: false,
  editAvatar: false,
  editProfile: false,
  addHouse: false,
  editHouse: false,
  deleteHouse: false,
}))
