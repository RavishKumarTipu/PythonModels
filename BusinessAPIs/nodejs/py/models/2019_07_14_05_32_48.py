import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model

#This is the test set, it's a straight line with some Gaussian noise
xmin, xmax = -10,10
n_samples = 100
np.random.seed(0)
x=np.random.normal(size =n_samples)
y = (x > 0).astype(np.float)
x[x>0] *= 5
x += .6 * np.random.normal(size=n_samples)
x = x[:, np.newaxis]

#run the classifier
clf = linear_model.LogisticRegression(C=1e2)
clf.fit(x,y)

#and plot the result
plt.figure(1, figsize=(4,3))
plt.clf()
plt.scatter(x.ravel(),y,color='black',zorder=20)
x_test = np.linspace(-10,10,300)

def model(x):
	return 1/(1+np.exp(-x))

loss = model(x_test *clf.coef_ + clf.intercept_).ravel()
plt.plot(x_test,loss,color='blue',linewidth=3)
ols = linear_model.LinearRegression()
ols.fit(x,y)
plt.plot(x_test,ols.coef_*x_test + ols.intercept_, linewidth=1)
plt.axhline(.5,color='.5')
plt.ylabel('y')
plt.xlabel('x')
plt.xticks(range(-10,10))
plt.yticks([0,0.5,1])
plt.ylim(-.25,1.25)
plt.xlim(-4,10)
plt.legend(('logistic regression model', 'Linear regression model'),loc='lower right', fontsize='small')
plt.show()