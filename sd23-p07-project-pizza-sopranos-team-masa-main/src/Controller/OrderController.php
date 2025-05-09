<?php

namespace App\Controller;

//use App\Entity\Category;
use App\Entity\Order;
use App\Entity\Pizza;
use App\Form\OrderType;
use App\Form\PizzaType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class OrderController extends AbstractController
{
    #[Route('/order/{id}', name: 'app-order')]
    public function order(EntityManagerInterface $entityManager,int $id, Request $request): Response
    {
        $pizza = $entityManager->getRepository(Pizza::class)->find($id);
        $order = new Order();
        $form = $this->createForm(OrderType::class, $order);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $order = $form->getData();
            $order -> setOrderDate(new \DateTime());
            $order->setPizza($pizza);
            $order->setAmount($pizza->getPrice());
            $order->setOrderStatus('Pending');
            $entityManager->persist($order);
            $entityManager->flush();
            return $this->redirectToRoute('pizza-app');
        }

        if (!$pizza) {
            throw $this->createNotFoundException('Pizza not found');
        }
        return $this->render('order/index.html.twig', [
            'pizza' => $pizza,
            'form' => $form
        ]);
    }

    #[Route('/orders', name: 'order-detail')]
    public function pizzaDetail(EntityManagerInterface $entityManager): Response
    {
        $order= $entityManager->getRepository(Order::class)->findAll();

        if (!$order) {
            throw $this->createNotFoundException('no orders found');
        }
        return $this->render('order/order.html.twig', [
            'orders' => $order,
        ]);
    }
}
