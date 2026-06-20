export interface Iproduct {
  pname: string;
  pid: string;
  pstatus: 'Delivered' | 'Shipped' |'Pending';
  canReturn: 1 | 0;
}
