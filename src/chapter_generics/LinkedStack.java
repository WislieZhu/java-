package chapter_generics;

public class LinkedStack<T> {

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
