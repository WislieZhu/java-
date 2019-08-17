package chapter_generics.practise_3;

public class LinkedStack {

    public static void main(String[] args) {
        NodeSimple stack = new NodeSimple();
        String str = "wislie is a good boy";
        for (String data : str.split(" ")) {
            stack.addHead(data);
        }

        while (stack.head != null) {
            System.out.println(" " + stack.head.data);
            stack.delHead();
        }
    }
}
