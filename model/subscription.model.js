import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP"],
    default: "USD",
  },
  frequency: {
    type: String,
    enum: ["weekly","monthly", "yearly"],
    default: "monthly",
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    default: "credit_card",
  },
  status: {
    type: String,
    enum: ["active", "paused", "canceled"],
    default: "active",
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (v) => v <= Date.now(),
      message: "Start date must be in the past",
    },
    default: Date.now,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return !v || v > this.startDate;
      },
      message: "End date must be after start date",
    },
    required: true,
  },
  renewalDate: {
    type: Date,
    validate: {
        validator: function (v) {
            return v > this.startDate;
        },
        message: "Renewal date must be after start date"
    }
  },
}, { timestamps: true });

subscriptionSchema.pre('save', function(next) {
    const renewalPeriods = {
        weekly: 7,
        monthly: 30,
        yearly: 365,
    };

    this.renewalDate = new Date(this.startDate.getTime() + (renewalPeriods[this.frequency] * 24 * 60 * 60 * 1000));
    if(this.renewalDate < new Date()) {
        this.status = "canceled";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
