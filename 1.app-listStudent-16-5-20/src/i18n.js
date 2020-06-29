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
      'project': 'Project',
      'tham': 'TRAN THI HONG THAM',
      'birthMe': '10 / 28 / 1998',
      'addressMe': '791/1 Tran Xoan Soan Street, Tan Hung Ward, District 7, Ho Chi Minh City',
      'skill': 'Skills',
      'languages': 'Languages',
      'listening': 'Toeic: Listening & Reading: 545/990',
      'speaking': 'Toeic: Speaking & Writing: 307/400',
      'project': 'Project',
      'project_1': 'Project 1: Convert PSD to HTML, CSS',
      'amazign':' Amazing landing page:',
      'project_2': 'Project 2: DOM pig game with pure JS',
      'pig_game':'DOM pig game:',
      'project_3': 'Project 3: Todo app with React',
      'manage': 'Manage student: ',
      'technology':'Technology used: HTML, CSS, JS, React, ant design library.',
      'description': ' Description: Simple manage student app with create, view, edit, delete, pagination, change locale.',
      'school': 'Vietnam National University Ho Chi Minh City - University of Science',
      'studentMe': 'Student',
      'interestes': 'Interestes',
      'education': 'Education',
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
      'project': 'Dự án',
      'tham': 'TRẦN THỊ HỒNG THẮM',
      'birthMe': '28 / 10 / 1998',
      'addressMe': '791/1 Trần Xuân Soạn, Phường Tân Hưng, Quận 7, Tp. Hồ Chí Minh',
      'skill': 'Kỹ năng',
      'languages': 'Ngoại ngữ',
      'listening': 'Toeic: Nghe & đọc: 545/990',
      'speaking': 'Toeic: Nói & viết: 307/400',
      'project': 'Dự án',
      'project_1': 'Dự án 1: Chuyển đổi PSD sang HTML, CSS',
      'amazign':'Trang Amazing:',
      'project_2': 'Dự án 2: Trò chơi tung xúc sắc với JS thuần',
      'pig_game':'Trò chơi tung xúc sắc:',
      'project_3': 'Dự án 3: Todo app',
      'manage': 'Quản lý sinh viên: ',
      'technology':'Sử dụng công nghệ: HTML, CSS, JS, React, thư viện ant design.',
      'description': ' Mô tả: Ứng dụng quản lý sinh viên với việc tạo, xem, chỉnh sửa, xóa, phân trang, chuyển đổi ngôn ngữ.',
      'school': 'Đại học Khoa học Tự Nhiên - Đại học Quốc gia Tp Hồ Chí Minh',
      'studentMe': 'Sinh viên',
      'interestes': 'Sở thích',
      'education': 'Học vấn',


      }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;