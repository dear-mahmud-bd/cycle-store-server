import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { PaymentServices } from './payment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OrderServices } from '../orders/order.service';

// my structure
const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const order = req.body;
  const finalOrder = await OrderServices.createOrderIntoDB(order);
  if (!finalOrder || !finalOrder._id) {
    return sendResponse(res, {
      success: false,
      message: 'Failed to place order.',
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    });
  }
  const paymentUrl = await PaymentServices.initiatePayment(
    order,
    finalOrder._id.toString(),
  );
  if (!paymentUrl?.GatewayPageURL) {
    return sendResponse(res, {
      success: false,
      message: 'Failed to initiate payment.',
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
  res.json({ success: true, url: paymentUrl.GatewayPageURL });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.params.tranId);
  //   console.log(req.params.orderId);
  const orderId = req.params.orderId;
  const status = 'approved';

  const updatedOrder = await OrderServices.updateOrderStatusInDB(
    orderId,
    status,
  );
  if (updatedOrder.status === 'approved') {
    res.redirect(
      `https://bicycle-store-04-1-client.vercel.app/dashboard/my-order-history/?orderId=${orderId}`,
    );
  } else {
    sendResponse(res, {
      success: false,
      message: 'payment fail',
      statusCode: httpStatus.BAD_REQUEST,
    });
  }
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  res.redirect(
    `https://bicycle-store-04-1-client.vercel.app/dashboard/payment-fail`,
  );
});

export const PaymentController = {
  initiatePayment,
  verifyPayment,
  paymentFail,
};
