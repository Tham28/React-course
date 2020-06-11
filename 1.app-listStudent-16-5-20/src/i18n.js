import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      
      'Fullname': 'Full name',
      'age': 'Age',
      'birthday': 'Birthday',
      'gender': 'Gender',
      'email': 'Email',
      'edit': 'Edit',
      'addStudent': 'Add Student',
      'home': 'Home',
      'projec': 'Project',
      'delete': 'Delete',
      'deleteStudent': 'Confirm delete student',
      'male': 'Male',
      'feMale': 'Female',
      'btnAdd': 'Add',
      'btnCancel': 'Cancel',
      'editStudent': 'Edit Student',
      'deleteContent': 'Student will delete!',
      'home': 'Home',
      'project': 'Project'
    }
  },
  vi:{
    translation: {
      'Fullname': 'Họ và tên',
      'age': 'Tuổi',
      'birthday': 'Ngày sinh',
      'gender': 'Giới tính',
      'email': 'Email',
      'edit': 'Sửa',
      'addStudent': 'Thêm sinh viên',
      'home': 'Trang chủ',
      'project': 'Dự án',
      'delete': 'Xóa',
      'deleteStudent': 'Xác nhận xóa sinh viên',
      'male': 'Nam',
      'feMale': 'Nữ',
      'btnAdd': 'Thêm',
      'btnCancel': 'Hủy',
      'editStudent': 'Sửa sinh viên',
      'deleteContent': 'Sinh viên sẽ được xóa!',
      'home': 'Trang chủ',
      'project': 'Dự án'


      }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;