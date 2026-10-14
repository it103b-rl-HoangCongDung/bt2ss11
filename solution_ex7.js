const devices = [];

const validateDeviceInput = (name, room, power) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Tên thiết bị không được để trống và phải là chuỗi hợp lệ');
  }
  if (!room || typeof room !== 'string' || room.trim() === '') {
    throw new Error('Tên phòng không được để trống');
  }
  if (typeof power !== 'number' || power <= 0 || isNaN(power)) {
    throw new Error('Công suất thiết bị phải là số dương lớn hơn 0');
  }
  return true;
};

const createDevice = (list, newDev) => {
  try {
    validateDeviceInput(newDev.name, newDev.room, newDev.power);
    const randomId = 'DEV_' + Math.floor(100 + Math.random() * 900);
    const deviceToAdd = {
      id: randomId,
      name: newDev.name.trim(),
      room: newDev.room.trim(),
      power: newDev.power,
      status: newDev.status !== undefined ? Boolean(newDev.status) : false
    };
    list.push(deviceToAdd);
    console.log('Thêm thành công thiết bị:', deviceToAdd);
    return deviceToAdd;
  } catch (error) {
    console.error('Lỗi khi thêm thiết bị:', error.message);
    return null;
  }
};

const readDevicesByRoom = (list, roomName) => {
  if (!roomName) {
    console.warn('Cảnh báo: Tên phòng không hợp lệ khi lọc thiết bị');
    return [];
  }
  const filtered = list.filter(dev => dev.room.toLowerCase() === roomName.toLowerCase());
  console.log('Danh sách thiết bị tại phòng ' + roomName + ':', filtered);
  return filtered;
};

const updateDevice = (list, id, updateData) => {
  const index = list.findIndex(dev => dev.id === id);
  if (index === -1) {
    console.warn('Không tìm thấy thiết bị với ID:', id);
    return false;
  }
  
  const currentDev = list[index];
  
  if (updateData.name !== undefined) {
    if (typeof updateData.name !== 'string' || updateData.name.trim() === '') {
      console.error('Lỗi cập nhật: Tên mới không hợp lệ');
      return false;
    }
    currentDev.name = updateData.name.trim();
  }
  
  if (updateData.room !== undefined) {
    if (typeof updateData.room !== 'string' || updateData.room.trim() === '') {
      console.error('Lỗi cập nhật: Phòng mới không hợp lệ');
      return false;
    }
    currentDev.room = updateData.room.trim();
  }
  
  if (updateData.power !== undefined) {
    if (typeof updateData.power !== 'number' || updateData.power <= 0) {
      console.error('Lỗi cập nhật: Công suất phải lớn hơn 0');
      return false;
    }
    currentDev.power = updateData.power;
  }
  
  if (updateData.status !== undefined) {
    currentDev.status = Boolean(updateData.status);
  }
  
  console.log('Cập nhật thành công thiết bị ID ' + id + ':', currentDev);
  return true;
};

const deleteDevice = (list, id) => {
  const index = list.findIndex(dev => dev.id === id);
  if (index === -1) {
    console.log('Xóa thất bại: Không tìm thấy thiết bị ID:', id);
    return false;
  }
  const removed = list.splice(index, 1);
  console.log('Đã gỡ bỏ thiết bị:', removed[0]);
  return true;
};

console.log('=== KIỂM THỬ HỆ THỐNG SMART HOME CRUD ===');
const myDevices = [];

createDevice(myDevices, { name: 'Đèn phòng khách', room: 'Phòng Khách', power: 15, status: true });
createDevice(myDevices, { name: 'Điều hòa nhiệt độ', room: 'Phòng Ngủ', power: 1200, status: false });
createDevice(myDevices, { name: 'Quạt trần', room: 'Phòng Khách', power: 75, status: true });

readDevicesByRoom(myDevices, 'Phòng Khách');

updateDevice(myDevices, myDevices[0].id, { power: 20, status: false });

deleteDevice(myDevices, 'DEV_999');
if (myDevices.length > 0) {
  deleteDevice(myDevices, myDevices[0].id);
}

console.log('Danh sách thiết bị cuối cùng:', myDevices);