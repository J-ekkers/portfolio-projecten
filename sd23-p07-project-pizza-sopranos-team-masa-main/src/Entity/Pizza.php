<?php

namespace App\Entity;

use App\Repository\PizzasRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PizzasRepository::class)]
class Pizza
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Description = null;

    #[ORM\Column(length: 13, nullable: true)]
    private ?int $Price = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $Img = null;

    #[ORM\Column(length: 11, nullable: true)]
    private ?int $Category_id = null;

    #[ORM\ManyToOne(inversedBy: 'pizzas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Category $category = null;

    #[ORM\OneToMany(mappedBy: 'pizza', targetEntity: Order::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(?string $Description): static
    {
        $this->Description = $Description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->Price;
    }

    public function setPrice(?int $Price): static
    {
        $this->Price = $Price;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->Img;
    }

    public function setImg(?string $Img): static
    {
        $this->Img = $Img;

        return $this;
    }

    public function getCategory_id(): ?string
    {
        return $this->Category_id;
    }

    public function setCategory_id(?string $Category_id): static
    {
        $this->Category_id = $Category_id;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setPizza($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getPizza() === $this) {
                $order->setPizza(null);
            }
        }

        return $this;
    }
}
