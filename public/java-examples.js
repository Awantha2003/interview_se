// Run each source independently as Main.java.
const make = (title,en,si,output,code) => ({title,en,si,output,code,lang:'Java'});
export const javaExamples = {
  'java-cart': make('Create two independent Java carts','Declare the fields. Set their initial values in Cart(String customer). In main, create one cart per customer and update only one of them.','Fields declare කරන්න. Cart(String customer) constructor එකෙන් මුල් values set කරන්න. main එකේ carts දෙකක් හදලා එකක් විතරක් update කරන්න.','Nila: 2\nSam: 0',`class Main {
    static class Cart {
        private final String customer;
        private int quantity;
        static final int MAX_ITEMS = 20;

        Cart(String customer) {
            this.customer = customer;
            this.quantity = 0;
        }

        void addDrinks(int amount) {
            if (amount <= 0 || amount > MAX_ITEMS - quantity) {
                throw new IllegalArgumentException("Invalid amount");
            }
            quantity += amount;
        }

        String summary() {
            return customer + ": " + quantity;
        }
    }

    public static void main(String[] args) {
        Cart nila = new Cart("Nila");
        Cart sam = new Cart("Sam");
        nila.addDrinks(2);
        System.out.println(nila.summary());
        System.out.println(sam.summary());
    }
}`),
  'java-delivery': make('Extend delivery and override its fee','Use super to initialize the inherited destination. Choose an overloaded signature from the arguments, then let runtime dispatch select the fee implementation.','super වලින් parent එකේ destination එක initialize කරන්න. Arguments අනුව overload එක තෝරනවා. Runtime එක actual delivery fee method එක call කරනවා.','Colombo: 250\nReference #42',`class Main {
    static class Delivery {
        private final String destination;

        Delivery(String destination) {
            this.destination = destination;
        }

        int fee() {
            return 100;
        }

        String label() {
            return destination + ": " + fee();
        }

        String label(int reference) {
            return "Reference #" + reference;
        }
    }

    static class ExpressDelivery extends Delivery {
        ExpressDelivery(String destination) {
            super(destination);
        }

        @Override
        int fee() {
            return 250;
        }
    }

    public static void main(String[] args) {
        Delivery delivery = new ExpressDelivery("Colombo");
        System.out.println(delivery.label());
        System.out.println(delivery.label(42));
    }
}`),
  'java-payment': make('Inject a payment method into checkout','Define a Payment interface. Use an abstract class to share receipt formatting. Give Checkout the method to use through its constructor.','Payment interface එක හදන්න. Receipt format එක abstract class එකෙන් share කරන්න. Checkout constructor එකට Payment implementation එක දෙන්න.','Card: Rs. 500\nWallet: Rs. 500',`class Main {
    interface Payment {
        String pay(int amount);
    }

    static abstract class ReceiptPayment implements Payment {
        String receipt(String method, int amount) {
            return method + ": Rs. " + amount;
        }
    }

    static class Card extends ReceiptPayment {
        public String pay(int amount) {
            return receipt("Card", amount);
        }
    }

    static class Wallet extends ReceiptPayment {
        public String pay(int amount) {
            return receipt("Wallet", amount);
        }
    }

    static class Checkout {
        private final Payment payment;

        Checkout(Payment payment) {
            this.payment = payment;
        }

        String pay(int amount) {
            return payment.pay(amount);
        }
    }

    public static void main(String[] args) {
        System.out.println(new Checkout(new Card()).pay(500));
        System.out.println(new Checkout(new Wallet()).pay(500));
    }
}`),
  'java-values': make('Compare text identity and logical equality','Use two distinct String objects with the same text. Compare identity, equality and their hash codes.','එකම text එක තියෙන වෙනම String objects දෙකක් හදන්න. Identity, equals සහ hashCode compare කරන්න.','false\ntrue\ntrue\nMango\nMANGO',`class Main {
    public static void main(String[] args) {
        String first = new String("Mango");
        String second = new String("Mango");

        System.out.println(first == second);
        System.out.println(first.equals(second));
        System.out.println(first.hashCode() == second.hashCode());

        String upper = first.toUpperCase(java.util.Locale.ROOT);
        System.out.println(first);
        System.out.println(upper);
    }
}`),
  'java-collection': make('Summarize an order with Java collections','Use a List for scan order, a Set for uniqueness, and a Map for totals. Filter the list with a stream.','Scan order එක List එකේ තියාගන්න. Unique items Set එකට ගන්න. Counts Map එකේ දාන්න. Stream එකෙන් filter කරන්න.','[Mango, Lime]\n2\n[Mango, Mango]',`import java.util.*;

class Main {
    public static void main(String[] args) {
        List<String> drinks = List.of("Mango", "Lime", "Mango");
        Set<String> distinct = new LinkedHashSet<>(drinks);
        Map<String, Integer> totals = new HashMap<>();

        for (String drink : drinks) {
            totals.merge(drink, 1, Integer::sum);
        }

        List<String> mangoes = drinks.stream()
            .filter(drink -> drink.equals("Mango"))
            .toList();

        System.out.println(distinct);
        System.out.println(totals.get("Mango"));
        System.out.println(mangoes);
    }
}`),
};
